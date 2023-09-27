"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { Quest } from "@/types/Quest";
import { QuestFormInput } from "./QuestFormInput";

export const submit = async ({
  questFormInputs,
}: {
  questFormInputs: QuestFormInput[];
}) => {
  "use server";

  const headers = fetchHeaders();

  const { data: quests, error } = await eden.quests.get(headers);

  if (!quests) {
    throw new Error(error?.message);
  }

  const indexedQuests = questFormInputs.map((quest, index) => ({
    ...quest,
    index,
  }));

  const newQuests = indexedQuests.filter(
    (quest) => quest.questId === undefined,
  );
  // TODO: Improve by updating only when necessary
  const updatedQuests = indexedQuests.filter(
    (quest) => quest.questId !== undefined,
  ) as { name: string; index: number; questId: string }[];
  const deletedQuests = quests.filter(
    (quest: Quest) =>
      !indexedQuests.find((indexedQuest) => indexedQuest.questId === quest.id),
  );

  await Promise.all([
    ...newQuests.map((quest) =>
      eden.quest.post({
        ...{
          name: quest.name,
          index: quest.index,
        },
        ...headers,
      }),
    ),
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
};
