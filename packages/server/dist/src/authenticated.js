import { NotFoundError } from "elysia";
import { session } from "./session";
export const authenticated = (app) => app.use(session).derive(async ({ session }) => {
    if (!session) {
        throw new NotFoundError();
    }
    return { session };
});
