"use server";

import { getUser } from "@/lib/getUser";
import { safeAction } from "@/lib/safeAction";
import prisma from "@/prisma/prisma";
import { Step } from "@/types/Step";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  questId: z.string(),
  steps: z.array(
    z.object({
      description: z.string().min(1),
      done: z.boolean(),
      stepId: z.string().optional(),
      id: z.string(),
    }),
  ),
});

type Data = z.infer<typeof schema>;

export const saveSteps = safeAction(schema, async (data: Data) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const steps = await prisma.step.findMany({
    where: {
      quest: {
        id: data.questId,
        user_id: user.userId,
      },
    },
  });

  const indexedFields = data.steps.map((field, index) => ({
    ...field,
    index,
  }));

  const createdFields = indexedFields.filter(
    (field) => field.stepId === undefined,
  );

  const updatedFields = indexedFields.filter((indexedField) => {
    const oldStep = steps.find((step) => step.id === indexedField.stepId);
    return (
      oldStep &&
      (indexedField.description !== oldStep.description ||
        indexedField.done !== oldStep.done ||
        indexedField.index !== oldStep.index)
    );
  }) as { description: string; done: boolean; index: number; stepId: string }[];

  const deletedFields = steps.filter(
    (step: Step) =>
      !indexedFields.find((indexedField) => indexedField.stepId === step.id),
  );

  await prisma.quest.update({
    where: {
      id: data.questId,
    },
    data: {
      steps: {
        deleteMany: deletedFields.map(({ id }) => ({ id })),
      },
    },
  });

  await Promise.all(
    updatedFields.map((field) =>
      prisma.step.update({
        where: {
          id: field.stepId,
        },
        data: {
          description: field.description,
          done: field.done,
          index: field.index,
        },
      }),
    ),
  );

  const createdFieldsResponse = await Promise.all(
    createdFields.map(async (createdField) => {
      const createdStep = await prisma.step.create({
        data: {
          ...createdField,
          quest_id: data.questId,
        },
      });

      return {
        ...createdStep,
        stepId: createdStep.id,
        id: createdField.id,
      };
    }),
  );

  revalidatePath("/", "layout");

  return createdFieldsResponse;
});
