import { auth } from "@/lucia/lucia";
import * as context from "next/headers";

export const getUser = async () => {
  const cookies = await context.cookies();
  const sessionId = cookies.get(auth.sessionCookieName)?.value;

  if (!sessionId) {
    return null;
  }

  const { user } = sessionId
    ? await auth.validateSession(sessionId)
    : { user: null };

  return user;
};
