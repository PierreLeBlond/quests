import Elysia from "elysia";
import { auth } from "./lucia";

export const session = (app: Elysia) =>
  app.derive(async (context) => {
    // @ts-ignore
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();
    return { session };
  });
