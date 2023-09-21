import { Elysia } from "elysia";
import { user } from "./user/user";
import cors from "@elysiajs/cors";
import { login } from "./login/login";
import swagger from "@elysiajs/swagger";
import { logout } from "./logout/logout";
import { authenticated } from "./authenticated";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { quest } from "./quest/quest";
import { step } from "./step/step";
const app = new Elysia()
    .use(cors())
    .use(swagger())
    .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
        set.status = 404;
        return "Not found :(";
    }
    if (code === "VALIDATION") {
        set.status = 400;
        return `Client error: ${error.message}`;
    }
    if (error instanceof OAuthRequestError) {
        set.status = 400;
        return `Client error: invalide OAuth code`;
    }
    set.status = 500;
    console.log(error);
    return "Internal server error :(";
})
    .use(login)
    .use(user)
    .use(authenticated)
    .get("/hello", async ({ session }) => {
    return { message: `Hello ${session.user.githubUsername} !` };
})
    .use(quest)
    .use(step)
    .use(logout)
    .listen({
    port: 3000,
    hostname: "192.168.1.88",
});
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
