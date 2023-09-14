import { t } from "elysia";
import { session } from "@/session";
export const user = (app) => app.use(session).get("/user", async ({ session }) => {
    return { user: session?.user };
}, {
    response: t.Object({
        user: t.Optional(t.Object({
            githubUsername: t.String(),
        })),
    }),
});
