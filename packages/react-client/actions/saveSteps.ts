"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { Step } from "@/types/Step";
import { z } from "zod";

const schema = z.object({
  questId: z.string(),
  steps: z.array(z.object({
    description: z.string().min(1),
    done: z.boolean(),
    stepId: z.string().optional()
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

  const newSteps = indexedSteps.filter(
    (step) => step.stepId === undefined,
  );
  // TODO: Improve by updating only when necessary
  const updatedSteps = indexedSteps.filter(
    (step) => step.stepId !== undefined,
  ) as { description: string; index: number; done: boolean, stepId: string }[];
  const deletedSteps = steps.filter(
    (step: Step) =>
      !indexedSteps.find((indexedStep) => indexedStep.stepId === step.id),
  );

  await Promise.all([
    ...newSteps.map((step) =>
      eden.quest[data.questId].step.post({
        ...{
          description: step.description,
          done: step.done,
          index: step.index,
        },
        ...headers,
      }),
    ),
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
});
