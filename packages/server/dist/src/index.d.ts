import { Elysia } from "elysia";
declare const app: Elysia<"", {
    error: {};
    request: {
        session: Readonly<{
            user: import("lucia").User;
            sessionId: string;
            activePeriodExpiresAt: Date;
            idlePeriodExpiresAt: Date;
            state: "idle" | "active";
            fresh: boolean;
        }> & Record<string, any>;
    };
    store: {};
    schema: {};
    meta: {
        schema: {
            "/login/github": {
                get: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            state: string;
                            url: string;
                        };
                    };
                };
            };
            "/login/github/callback": {
                post: {
                    body: {
                        code: string;
                    };
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            session: {
                                sessionId: string;
                            };
                        };
                    };
                };
            };
            "/user": {
                get: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            user?: {
                                githubUsername: string;
                            } | undefined;
                        };
                    };
                };
            };
            "/hello": {
                get: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': Promise<{
                            message: string;
                        }>;
                    };
                };
            };
        } & {
            "/logout": {
                post: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': Promise<void>;
                    };
                };
            };
        };
        defs: {};
        exposed: {};
    };
}>;
export type App = typeof app;
export {};
//# sourceMappingURL=index.d.ts.map