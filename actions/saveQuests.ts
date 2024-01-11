"use server";

import { getUser } from "@/lib/getUser";
import { safeAction } from "@/lib/safeAction";
import { questsInputsSchema } from "@/lib/schema/questsInputsSchema";
import { getUserQuests } from "@/lib/user/getUserQuests";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Data = z.infer<typeof questsInputsSchema>;

export const saveQuests = safeAction(
  questsInputsSchema,
  async (questsInputs: Data) => {
    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const quests = await prisma.quest.findMany({
      where: {
        user: {
          id: user.userId,
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

    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        quests: {
          deleteMany: deleteQuestsInputs.map(({ id }) => ({ id })),
        },
      },
    });

    await Promise.all(
      updateQuestsInputs.map((updateQuestInput) =>
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
    );

    await Promise.all(
      createQuestsInputs.map(async (questInput) =>
        prisma.quest.create({
          data: {
            name: questInput.name,
            index: questInput.index,
            user_id: user.userId,
          },
        }),
      ),
    );

    revalidatePath("/");

    return getUserQuests(user);
  },
);
