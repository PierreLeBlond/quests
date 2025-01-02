"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalQuests } from "@/components/LocalQuestsProvider";
import { saveLocalQuests } from "@/lib/local/saveLocalQuests";
import { Quests } from "./Quests";
import { QuestInput } from "@/types/Quest";
import { StepInput } from "@/types/Step";

export function LocalQuests() {
  const localQuests = useLocalQuests();

  if (localQuests) {
    return (
      <Quests
        props={{
          quests: localQuests,
          saveQuests: async (questInputs: QuestInput[]) => {
            const quests = questInputs.map(
              (quest: QuestInput, index: number) => {
                const id = quest.id || uuidv4();
                return {
                  name: quest.name,
                  index,
                  id,
                  archived: false,
                  user_id: "local",
                  steps: quest.steps.map((step: StepInput) => ({
                    ...step,
                    id: step.id || uuidv4(),
                    quest_id: id,
                  })),
                };
              },
            );

            saveLocalQuests(quests);

            return { data: quests };
          },
        }}
      />
    );
  }
}
