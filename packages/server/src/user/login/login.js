import Elysia from "elysia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { auth, githubAuth } from "@api/lucia";
import cookie from "@elysiajs/cookie";
export const login = new Elysia({ prefix: "/login" })
    .use(cookie({
    httpOnly: true,
    secure: Bun.env.NODE_ENV == "production",
    path: "/",
}))
    .get("/github", async ({ setCookie, set }) => {
    const [url, state] = await githubAuth.getAuthorizationUrl();
    setCookie("github_oauth_state", state, {
        maxAge: 60 * 60,
    });
    // Or redirect ?
    set.status = 302;
    set.headers["Location"] = url.toString();
})
    .get("/github/callback", async (context) => {
    const { set, cookie, query } = context;
    if (!cookie.github_oauth_state ||
        !query.state ||
        cookie.github_oauth_state !== query.state ||
        typeof query.code !== "string") {
        set.status = 404;
        return "Unauthorized";
    }
    try {
        const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(query.code);
        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser)
                return existingUser;
            const user = await createUser({
                attributes: {
                    github_username: githubUser.login,
                },
            });
            return user;
        };
        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(context);
        authRequest.setSession(session);
        set.status = 302;
        set.headers["Location"] = "/";
    }
    catch (e) {
        if (e instanceof OAuthRequestError) {
            console.log(e);
            // invalid code
            set.status = 400;
            return "Invalid code";
        }
        console.log(e);
        set.status = 500;
        return "Internal server error";
    }
});
