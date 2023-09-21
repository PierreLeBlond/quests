import Elysia from "elysia";
export declare const step: (app: Elysia) => Elysia<"", {
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
        "/quest/:questId/steps": {
            get: {
                body: unknown;
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        done?: boolean | undefined;
                        id: string;
                        description: string;
                        quest_id: string;
                    }[];
                };
            };
        };
        "/quest/:questId/step/:id": {
            get: {
                body: unknown;
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        done?: boolean | undefined;
                        id: string;
                        description: string;
                        quest_id: string;
                    };
                };
            };
        } & {
            post: {
                body: {
                    done?: boolean | undefined;
                    description: string;
                };
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        done?: boolean | undefined;
                        id: string;
                        description: string;
                        quest_id: string;
                    };
                };
            };
        } & {
            delete: {
                body: unknown;
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        done?: boolean | undefined;
                        id: string;
                        description: string;
                        quest_id: string;
                    };
                };
            };
        };
        "/quest/:questId/step": {
            post: {
                body: {
                    done?: boolean | undefined;
                    description: string;
                };
                headers: undefined;
                query: undefined;
                params: undefined;
                response: {
                    '200': {
                        done?: boolean | undefined;
                        id: string;
                        description: string;
                        quest_id: string;
                    };
                };
            };
        };
    }>;
}>;
//# sourceMappingURL=step.d.ts.map