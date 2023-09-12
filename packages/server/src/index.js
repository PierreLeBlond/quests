import { Elysia } from "elysia";
import { auth } from "./lucia";
import { user } from "./user/user";
const app = new Elysia()
    .get("/", async () => {
    return "Hello world !";
}, {
    beforeHandle: async (context) => {
        const { set } = context;
        const authRequest = auth.handleRequest(context);
        const session = await authRequest.validate();
        if (!session) {
            set.redirect = "/user/login/github";
        }
    },
})
    .use(user)
    .listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
