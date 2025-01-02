"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalQuests } from "@/components/LocalQuestsProvider";
import { saveLocalQuests } from "@/lib/local/saveLocalQuests";
import { getLocalQuests } from "@/lib/local/getLocalQuests";
import { Steps } from "./Steps";
import { StepInput } from "@/types/Step";
import { QuestInput } from "@/types/Quest";

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
          saveSteps: async (questInput: QuestInput) => {
            // Generate ids for new steps
            const steps = questInput.steps.map(
              (step: StepInput, index: number) => {
                const id = step.id || uuidv4();
                return {
                  description: step.description,
                  done: step.done,
                  index,
                  id,
                  quest_id: localQuest.id,
                };
              },
            );

            const quests = getLocalQuests();

            const quest = {
              ...localQuest,
              steps,
              archived: false,
              user_id: "local",
            };

            // Replace updated quest
            quests.splice(
              quests.findIndex((q) => q.id === localQuest.id),
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
