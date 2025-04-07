import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import client from "@/prisma/prisma";
import { GitHub } from "arctic";

export const auth = new Lucia(new PrismaAdapter(client.session, client.user), {
  getUserAttributes: (attributes) => ({
    githubId: attributes.id,
    username: attributes.github_username,
  }),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // replaces `env` config
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  github_username: string;
}

const clientId = process.env.GITHUB_CLIENT_ID || "";
const clientSecret = process.env.GITHUB_CLIENT_SECRET || "";

export const githubAuth = new GitHub(
  clientId,
  clientSecret,
  `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}/login/github/verification`,
);

export type Auth = typeof auth;
