"use server";

import { getUser } from "@/lib/getUser";
import { safeAction } from "@/lib/safeAction";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  quests: z.array(
    z.object({
      name: z.string().min(1),
      questId: z.string().optional(),
      id: z.string(),
    }),
  ),
});

type Data = z.infer<typeof schema>;

export const saveQuests = safeAction(schema, async (data: Data) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const quests = await prisma.quest.findMany({
    where: {
      user: {
        id: user.userId,
      },
    },
  });

  const indexedFields = data.quests.map((field, index) => ({
    ...field,
    index,
  }));

  const createdFields = indexedFields.filter(
    (field) => field.questId === undefined,
  );

  const updatedFields = indexedFields.filter((indexedField) => {
    const oldQuest = quests.find((quest) => quest.id === indexedField.questId);
    return (
      oldQuest &&
      (indexedField.name !== oldQuest.name ||
        indexedField.index !== oldQuest.index)
    );
  }) as { name: string; index: number; questId: string }[];

  const deletedQuests = quests.filter(
    (quest) =>
      !indexedFields.find((indexedField) => indexedField.questId === quest.id),
  );

  await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      quests: {
        deleteMany: deletedQuests.map(({ id }) => ({ id })),
      },
    },
  });

  await Promise.all(
    updatedFields.map((updatedField) =>
      prisma.quest.update({
        where: {
          id: updatedField.questId,
        },
        data: {
          index: updatedField.index,
          name: updatedField.name,
        },
      }),
    ),
  );

  const createdFieldsResponse = await Promise.all(
    createdFields.map(async (createdField) => {
      const createdQuest = await prisma.quest.create({
        data: { ...createdField, user_id: user.userId },
      });

      return {
        ...createdQuest,
        questId: createdQuest.id,
        id: createdField.id,
      };
    }),
  );

  revalidatePath("/", "layout");

  return createdFieldsResponse;
});
