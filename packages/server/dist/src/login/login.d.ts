import Elysia from "elysia";
export declare const login: (app: Elysia) => Elysia<"", {
    error: {};
    request: {};
    schema: {};
    store: {};
    meta: {
        schema: {};
        defs: {};
        exposed: {};
    } & Record<"defs", {}> & Record<"exposed", {}> & Record<"schema", {
        "/login/github": {
            get: {
                body: unknown;
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        url: string;
                        state: string;
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
    }>;
}>;
//# sourceMappingURL=login.d.ts.map