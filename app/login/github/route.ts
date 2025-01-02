import * as context from "next/headers";
import { generateState } from "arctic";
import { githubAuth } from "@/lucia/lucia";

export const GET = async () => {
  const state = generateState();
  const url = await githubAuth.createAuthorizationURL(state, []);
  // store state
  const cookies = await context.cookies();
  cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
