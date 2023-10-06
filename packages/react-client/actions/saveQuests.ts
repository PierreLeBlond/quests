"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { Quest } from "@/types/Quest";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  quests: z.array(z.object({
    name: z.string().min(1),
    questId: z.string().optional(),
    id: z.string()
  }))
});

type Data = z.infer<typeof schema>;

export const saveQuests = safeAction(schema, async (data: Data) => {
  const headers = fetchHeaders();

  const { data: quests, error } = await eden.quests.get(headers);

  if (!quests) {
    throw new Error(error?.message);
  }

  const indexedQuests = data.quests.map((quest, index) => ({
    ...quest,
    index,
  }));

  const newQuests = indexedQuests.filter(
    (quest) => quest.questId === undefined,
  );

  const updatedQuests = indexedQuests.filter(
    (indexedQuest) => {
      const oldQuest = quests.find(quest => quest.id === indexedQuest.questId);
      if (!oldQuest) {
        return true;
      }
      return !oldQuest
        || indexedQuest.name !== oldQuest.name
        || indexedQuest.index !== oldQuest.index;
    }
  ) as { name: string; index: number; questId: string }[];;
  const deletedQuests = quests.filter(
    (quest: Quest) =>
      !indexedQuests.find((indexedQuest) => indexedQuest.questId === quest.id),
  );

  const createdQuests = await Promise.all(
    newQuests.map((quest) => eden.quest.post({
      ...{
        name: quest.name,
        index: quest.index,
      },
      ...headers,
    }))
  );

  await Promise.all([
    ...updatedQuests.map((quest) =>
      eden.quest[quest.questId].post({
        ...{
          name: quest.name,
          index: quest.index,
        },
        ...headers,
      }),
    ),
    ...deletedQuests.map((quest) => eden.quest[quest.id].delete(headers)),
  ]);

  revalidatePath("/quests");

  return newQuests.map((newQuest, index) => {
    const response = createdQuests.at(index);
    if (!response?.data) {
      return newQuest;
    }
    return {
      ...response.data,
      questId: response.data.id,
      id: newQuest.id
    }
  })
});
