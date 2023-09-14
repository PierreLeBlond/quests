import Elysia from "elysia";
import { auth } from "@/lucia";
import { authenticated } from "@/authenticated";

export const logout = (app: Elysia) =>
  app.use(authenticated).post("/logout", async (context) => {
    const { session } = context;
    await auth.invalidateSession(session.sessionId);

    const authRequest = auth.handleRequest(context);
    authRequest.setSession(null);
  });
