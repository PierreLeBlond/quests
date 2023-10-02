"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  index: z.number()
})

export const createQuest = safeAction(schema, async ({
  name, index
}) => {
  const headers = fetchHeaders();

  const { data: quest, error } = await 
  eden.quest.post({
        ...{
          name,
          index
        },
        ...headers,
      });

  if (!quest) {
    return {
      failure: {
        reason: error?.message
      }
    }
  }

  revalidatePath('/quests');

  return quest;
});
