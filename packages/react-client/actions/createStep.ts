"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(1),
  index: z.number(),
  done: z.boolean(),
  questId: z.string()
})

export const createStep = safeAction(schema, async ({
  description, index, done, questId
}) => {
  const headers = fetchHeaders();

  const { data: step, error } = await
    eden.quest[questId].step.post({
      ...{
        description,
        index,
        done
      },
      ...headers,
    });

  if (!step) {
    return {
      failure: {
        reason: error?.message
      }
    }
  }

  revalidatePath(`/quest/${questId}`);
  revalidatePath("/quests");

  return step;
});
