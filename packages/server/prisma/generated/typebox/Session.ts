import { Type, Static } from "@sinclair/typebox";

export const Session = Type.Object({
  id: Type.String(),
  user_id: Type.String(),
  active_expires: Type.Integer(),
  idle_expires: Type.Integer(),
  user: Type.Object({
    id: Type.String(),
    github_username: Type.String(),
  }),
});

export type SessionType = Static<typeof Session>;