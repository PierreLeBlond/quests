import Elysia, { NotFoundError } from "elysia";
import { getSession } from "./getSession";

export const authenticated = (app: Elysia) =>
  app.use(getSession).derive(({ session }) => {
    if (!session) {
      throw new NotFoundError();
    }

    return { session };
  });
