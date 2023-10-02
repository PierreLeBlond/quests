import { Type, Static } from "@sinclair/typebox";

export const Quest = Type.Object({
  id: Type.String(),
  name: Type.String(),
  archived: Type.Optional(Type.Boolean()),
  user_id: Type.String(),
  user: Type.Object({
    id: Type.String(),
    github_username: Type.String(),
  }),
  index: Type.Number(),
  steps: Type.Array(
    Type.Object({
      id: Type.String(),
      description: Type.String(),
      done: Type.Optional(Type.Boolean()),
      index: Type.Number(),
      quest_id: Type.String(),
    })
  ),
});

export type QuestType = Static<typeof Quest>;
