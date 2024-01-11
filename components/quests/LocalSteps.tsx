"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalQuests } from "@/components/LocalQuestsProvider";
import { saveLocalQuests } from "@/lib/local/saveLocalQuests";
import { getLocalQuests } from "@/lib/local/getLocalQuests";
import { Steps } from "./Steps";

type LocalStepProps = {
  questId: string;
};

export function LocalSteps({ props }: { props: LocalStepProps }) {
  const { questId } = props;

  const localQuests = useLocalQuests();
  const localQuest = localQuests?.find((quest) => quest.id === questId);

  if (localQuest) {
    return (
      <Steps
        props={{
          quest: localQuest,
          saveSteps: async (questInput) => {
            // Generate ids for new steps
            const steps = questInput.steps.map((step, index) => {
              const id = step.id || uuidv4();
              return {
                description: step.description,
                done: step.done,
                index,
                id,
              };
            });

            const quest = {
              ...questInput,
              steps,
            };

            const quests = getLocalQuests();

            // Replace updated quest
            quests.splice(
              quests.findIndex((q) => q.id === quest.id),
              1,
              quest,
            );

            saveLocalQuests(quests);

            return { data: quest };
          },
        }}
      />
    );
  }
}
