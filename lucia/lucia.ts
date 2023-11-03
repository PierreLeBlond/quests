import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";

import { github } from "@lucia-auth/oauth/providers";
import client from "@/prisma/prisma";
import { nextjs_future } from "lucia/middleware";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  adapter: prisma(client),
  middleware: nextjs_future(),
  getUserAttributes: (data) => ({
    githubUsername: data.github_username,
  }),
  sessionCookie: {
    expires: false,
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

export type Auth = typeof auth;
