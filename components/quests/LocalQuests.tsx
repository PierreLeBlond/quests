"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalQuests } from "@/components/LocalQuestsProvider";
import { saveLocalQuests } from "@/lib/local/saveLocalQuests";
import { Quests } from "./Quests";

export function LocalQuests() {
  const localQuests = useLocalQuests();

  if (localQuests) {
    return (
      <Quests
        props={{
          quests: localQuests,
          saveQuests: async (questInputs) => {
            const quests = questInputs.map((quest, index) => {
              const id = quest.id || uuidv4();
              return {
                name: quest.name,
                index,
                id,
                steps: quest.steps,
              };
            });

            saveLocalQuests(quests);

            return { data: quests };
          },
        }}
      />
    );
  }
}
