import { z } from "zod";

export const questsInputsSchema = z.array(
  z.object({
    name: z.string().min(1),
    index: z.number().min(0),
    id: z.string().optional(),
    steps: z.array(
      z.object({
        description: z.string().min(1),
        index: z.number().min(0),
        done: z.boolean(),
        id: z.string(),
      }),
    ),
  }),
);
