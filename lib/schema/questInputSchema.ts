import { z } from "zod";

export const questInputSchema = z.object({
  name: z.string().min(1),
  index: z.number().min(0),
  id: z.string(),
  steps: z.array(
    z.object({
      description: z.string().min(1),
      index: z.number().min(0),
      done: z.boolean(),
      id: z.string().optional(),
    }),
  ),
});
