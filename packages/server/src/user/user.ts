import Elysia, { t } from "elysia";
import { session } from "@/src/session";

export const user = (app: Elysia) =>
  app.use(session).get(
    "/user",
    async ({ session }) => {
      return { user: session?.user };
    },
    {
      response: t.Object({
        user: t.Optional(
          t.Object({
            githubUsername: t.String(),
          })
        ),
      }),
    }
  );
