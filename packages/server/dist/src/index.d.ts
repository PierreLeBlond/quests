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
            "/quests": {
                get: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            archived?: boolean | undefined;
                            name: string;
                            id: string;
                            user_id: string;
                            index: number;
                            steps: {
                                done?: boolean | undefined;
                                id: string;
                                description: string;
                                quest_id: string;
                            }[];
                        }[];
                    };
                };
            };
            "/quest/:questId": {
                get: {
                    body: unknown;
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            archived?: boolean | undefined;
                            name: string;
                            id: string;
                            user_id: string;
                            index: number;
                            steps: {
                                done?: boolean | undefined;
                                id: string;
                                description: string;
                                quest_id: string;
                            }[];
                        };
                    };
                };
            } & {
                post: {
                    body: {
                        archived?: boolean | undefined;
                        name: string;
                        index: number;
                    };
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            archived?: boolean | undefined;
                            name: string;
                            id: string;
                            user_id: string;
                            index: number;
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
                            archived?: boolean | undefined;
                            name: string;
                            id: string;
                            user_id: string;
                            index: number;
                        };
                    };
                };
            };
            "/quest": {
                post: {
                    body: {
                        archived?: boolean | undefined;
                        name: string;
                        index: number;
                    };
                    headers: undefined;
                    query: undefined;
                    params: undefined;
                    response: {
                        '200': {
                            archived?: boolean | undefined;
                            name: string;
                            id: string;
                            user_id: string;
                            index: number;
                        };
                    };
                };
            };
        } & {
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