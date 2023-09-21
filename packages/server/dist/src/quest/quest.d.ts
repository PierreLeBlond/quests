import Elysia from "elysia";
export declare const quest: (app: Elysia) => Elysia<"", {
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
    }>;
}>;
//# sourceMappingURL=quest.d.ts.map