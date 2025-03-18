"use server";

import { getUser } from "@/lib/getUser";
import { safeAction } from "@/lib/safeAction";
import { questsInputsSchema } from "@/lib/schema/questsInputsSchema";
import { getUserQuests } from "@/lib/user/getUserQuests";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const saveQuests = safeAction
  .schema(questsInputsSchema)
  .action(async ({ parsedInput: questsInputs }) => {
    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const quests = await prisma.quest.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const createQuestsInputs = questsInputs.filter(
      (questInput) => !questInput.id,
    );

    const updateQuestsInputs = questsInputs.filter((questInput) => {
      const oldQuest = quests.find((quest) => quest.id === questInput.id);
      return (
        oldQuest &&
        (questInput.name !== oldQuest.name ||
          questInput.index !== oldQuest.index)
      );
    }) as { name: string; index: number; id: string }[];

    const deleteQuestsInputs = quests.filter(
      (quest) => !questsInputs.find((questInput) => questInput.id === quest.id),
    );

    await Promise.all([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          quests: {
            deleteMany: deleteQuestsInputs.map(({ id }) => ({ id })),
          },
        },
      }),
      ...updateQuestsInputs.map((updateQuestInput) =>
        prisma.quest.update({
          where: {
            id: updateQuestInput.id,
          },
          data: {
            index: updateQuestInput.index,
            name: updateQuestInput.name,
          },
        }),
      ),
      ...createQuestsInputs.map(async (questInput) =>
        prisma.quest.create({
          data: {
            name: questInput.name,
            index: questInput.index,
            user_id: user.id,
          },
        }),
      ),
    ]);

    revalidatePath("/");

    return getUserQuests(user);
  });

export type SaveQuestsAction = typeof saveQuests;
