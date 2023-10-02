import { Type, Static } from "@sinclair/typebox";

export const Step = Type.Object({
  id: Type.String(),
  description: Type.String(),
  done: Type.Optional(Type.Boolean()),
  index: Type.Number(),
  quest_id: Type.String(),
  quest: Type.Object({
    id: Type.String(),
    name: Type.String(),
    archived: Type.Optional(Type.Boolean()),
    user_id: Type.String(),
    index: Type.Number(),
  }),
});

export type StepType = Static<typeof Step>;
