import Elysia, { t } from "elysia";
import { session } from "@/session";
import { User } from "lucia";
import { Optional } from "@sinclair/typebox";

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
