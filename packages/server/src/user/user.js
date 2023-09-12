import Elysia from "elysia";
import { login } from "./login/login";
import { auth } from "@api/lucia";
export const user = new Elysia({ prefix: "/user" })
    .use(login)
    .get("/", async (context) => {
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validate();
    if (!session) {
        return null;
    }
    const user = session.user;
    const username = user.username;
    return {
        user,
        username,
    };
})
    .post("/logout", async (context) => {
    const { set } = context;
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validate();
    if (!session) {
        set.status = 401;
        return "Unauthorized";
    }
    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);
    set.redirect = "/user/login/github";
});
