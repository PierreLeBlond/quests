"use server";

import { getUser } from "@/lib/getUser";
import { safeAction } from "@/lib/safeAction";
import { questInputSchema } from "@/lib/schema/questInputSchema";
import { getUserQuest } from "@/lib/user/getUserQuest";
import prisma from "@/prisma/prisma";
import { Step } from "@/types/Step";
import { revalidatePath } from "next/cache";

export const saveSteps = safeAction
  .schema(questInputSchema)
  .action(async ({ parsedInput: questInput }) => {
    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const steps = await prisma.step.findMany({
      where: {
        quest: {
          id: questInput.id,
          user_id: user.id,
        },
      },
    });

    const createStepsInputs = questInput.steps.filter(
      (stepInput) => !stepInput.id,
    );

    const updateStepsInputs = questInput.steps.filter((stepInput) => {
      const oldStep = steps.find((step) => step.id === stepInput.id);
      return (
        oldStep &&
        (stepInput.description !== oldStep.description ||
          stepInput.done !== oldStep.done ||
          stepInput.index !== oldStep.index)
      );
    }) as {
      description: string;
      done: boolean;
      index: number;
      id: string;
    }[];

    const deleteStepsInputs = steps.filter(
      (step: Step) =>
        !questInput.steps.find((stepInput) => stepInput.id === step.id),
    );

    await prisma.quest.update({
      where: {
        id: questInput.id,
      },
      data: {
        steps: {
          deleteMany: deleteStepsInputs.map(({ id }) => ({ id })),
        },
      },
    });

    await Promise.all(
      updateStepsInputs.map((stepInput) =>
        prisma.step.update({
          where: {
            id: stepInput.id,
          },
          data: {
            description: stepInput.description,
            done: stepInput.done,
            index: stepInput.index,
          },
        }),
      ),
    );

    await Promise.all(
      createStepsInputs.map(async (stepInput) =>
        prisma.step.create({
          data: {
            ...stepInput,
            quest_id: questInput.id,
          },
        }),
      ),
    );

    revalidatePath("/");

    return getUserQuest(user, questInput.id);
  });

export type SaveStepsAction = typeof saveSteps;
