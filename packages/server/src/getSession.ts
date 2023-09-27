import Elysia from "elysia";
import { auth } from "./lucia";

export const getSession = (app: Elysia) =>
  app.derive(async (context) => {
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();
    return { session };
  });
