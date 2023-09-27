import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { user } from "./user/user";
import { loginPlugin } from "./login/loginPlugin";
import { logoutPlugin } from "./logout/logoutPlugin";
import { authenticated } from "./authenticated";
import { questPlugin } from "./quest/questPlugin";
import { stepPlugin } from "./step/stepPlugin";

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
    return "Internal server error :(";
  })
  .use(loginPlugin)
  .use(user)
  .use(authenticated)
  .use(questPlugin)
  .use(stepPlugin)
  .use(logoutPlugin)
  .listen({
    hostname: "0.0.0.0",
    port: 3000,
  });

export type App = typeof app;
