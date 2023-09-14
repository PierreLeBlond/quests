import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import client from "./prisma";
import { elysia } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";
export const auth = lucia({
    env: process.env.NODE_ENV == "development" ? "DEV" : "PROD",
    adapter: prisma(client),
    middleware: elysia(),
    getUserAttributes: (data) => {
        return {
            githubUsername: data.github_username,
        };
    },
});
export const githubAuth = github(auth, {
    clientId: Bun.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: Bun.env.GITHUB_CLIENT_SECRET ?? "",
});
