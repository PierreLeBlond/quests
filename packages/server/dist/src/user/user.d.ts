import Elysia from "elysia";
export declare const user: (app: Elysia) => Elysia<"", {
    request: {
        session: import("lucia").Session | null;
    };
    store: {};
    schema: {};
    error: {};
    meta: {
        defs: {};
        exposed: {};
        schema: {
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
        };
    };
}>;
//# sourceMappingURL=user.d.ts.map