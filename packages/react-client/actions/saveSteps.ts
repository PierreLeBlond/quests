"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { Step } from "@/types/Step";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  questId: z.string(),
  steps: z.array(z.object({
    description: z.string().min(1),
    done: z.boolean(),
    stepId: z.string()
  }))
});

type Data = z.infer<typeof schema>;

export const saveSteps = safeAction(schema, async (data: Data) => {
  const headers = fetchHeaders();

  const { data: steps, error } = await eden.quest[data.questId].steps.get(headers);

  if (!steps) {
    throw new Error(error?.message);
  }

  const indexedSteps = data.steps.map((step, index) => ({
    ...step,
    index,
  }));

  const updatedSteps = indexedSteps.filter(
    (indexedStep) => {
      const oldStep = steps.find(step => step.id === indexedStep.stepId);
      if (!oldStep) {
        return true;
      }
      return !oldStep
        || indexedStep.description !== oldStep.description
        || indexedStep.done !== oldStep.done
        || indexedStep.index !== oldStep.index;
    }
  );
  const deletedSteps = steps.filter(
    (step: Step) =>
      !indexedSteps.find((indexedStep) => indexedStep.stepId === step.id),
  );

  await Promise.all([
    ...updatedSteps.map((step) =>
      eden.quest[data.questId].step[step.stepId].post({
        ...{
          description: step.description,
          done: step.done,
          index: step.index,
        },
        ...headers,
      }),
    ),
    ...deletedSteps.map((step) => eden.quest[data.questId].step[step.id].delete(headers)),
  ]);

  revalidatePath("/quest");
  revalidatePath("/quests");
});
