import { Type } from "@sinclair/typebox";
export const SessionInput = Type.Object({
    id: Type.String(),
    user_id: Type.String(),
    active_expires: Type.Integer(),
    idle_expires: Type.Integer(),
    user: Type.Object({
        id: Type.String(),
        github_username: Type.String(),
    }),
});
