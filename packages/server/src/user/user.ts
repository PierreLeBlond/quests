import Elysia, { t } from "elysia";
import { getSession } from "@/src/getSession";

export const user = (app: Elysia) =>
  app.use(getSession).get("/user", ({ session }) => ({ user: session?.user }), {
    response: t.Object({
      user: t.Optional(
        t.Object({
          githubUsername: t.String(),
        }),
      ),
    }),
  });
