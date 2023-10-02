"use server";

import { eden, fetchHeaders } from "@/lib/eden";
import { safeAction } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string()
})

export const deleteQuest = safeAction(schema, async ({
  id
}) => {
  const headers = fetchHeaders();

  const { data: quest, error } = await eden.quest[id].delete(headers);

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
