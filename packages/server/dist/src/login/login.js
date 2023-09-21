import { t } from "elysia";
import { auth, githubAuth } from "@/src/lucia";
export const login = (app) => app.group("/login", (app) => app
    .get("/github", async () => {
    const [url, state] = await githubAuth.getAuthorizationUrl();
    return { url: url.toString(), state };
}, {
    response: t.Object({
        url: t.String(),
        state: t.String(),
    }),
})
    .post("/github/callback", async (context) => {
    const { body } = context;
    const { code } = body;
    const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);
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
    return { session };
}, {
    body: t.Object({
        code: t.String(),
    }),
    response: t.Object({
        session: t.Object({
            sessionId: t.String(),
        }),
    }),
}));
