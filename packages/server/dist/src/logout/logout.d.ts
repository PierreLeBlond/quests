import Elysia from "elysia";
export declare const logout: (app: Elysia) => Elysia<"", {
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
    error: {};
    meta: Record<"defs", {}> & Record<"exposed", {}> & Record<"schema", {
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
    }>;
}>;
//# sourceMappingURL=logout.d.ts.map