import { auth } from "./lucia";
export const session = (app) => app.derive(async (context) => {
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();
    return { session };
});
