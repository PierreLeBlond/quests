"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  index: z.number(),
  id: z.string()
})

export const updateQuest = safeAction(schema, async ({
  name, index, id
}) => {
  const headers = fetchHeaders();

  const { data: quest, error } = await eden.quest[id].post({
        name,
        index,
        ...headers
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
