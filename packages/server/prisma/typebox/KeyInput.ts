import { Type, Static } from "@sinclair/typebox";

export const KeyInput = Type.Object({
  id: Type.String(),
  hashed_password: Type.Optional(Type.String()),
  user_id: Type.String(),
  user: Type.Object({
    id: Type.String(),
    github_username: Type.String(),
  }),
});

export type KeyInputType = Static<typeof KeyInput>;
