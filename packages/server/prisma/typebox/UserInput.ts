import { Type, Static } from "@sinclair/typebox";

export const UserInput = Type.Object({
  id: Type.String(),
  auth_session: Type.Array(
    Type.Object({
      id: Type.String(),
      user_id: Type.String(),
      active_expires: Type.Integer(),
      idle_expires: Type.Integer(),
    })
  ),
  key: Type.Array(
    Type.Object({
      id: Type.String(),
      hashed_password: Type.Optional(Type.String()),
      user_id: Type.String(),
    })
  ),
  quests: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      archived: Type.Optional(Type.Boolean()),
      user_id: Type.String(),
      index: Type.Number(),
    })
  ),
  github_username: Type.String(),
});

export type UserInputType = Static<typeof UserInput>;
