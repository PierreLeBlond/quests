/// <reference types="bun-types" />
export declare const auth: import("lucia").Auth<{
    env: "DEV" | "PROD";
    adapter: import("lucia").InitializeAdapter<Readonly<{
        getSessionAndUser?: ((sessionId: string) => Promise<[{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }, import("lucia").UserSchema] | [null, null]>) | undefined;
    } & Readonly<{
        getSession: (sessionId: string) => Promise<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        } | null>;
        getSessionsByUserId: (userId: string) => Promise<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }[]>;
        setSession: (session: {
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }) => Promise<void>;
        updateSession: (sessionId: string, partialSession: Partial<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }>) => Promise<void>;
        deleteSession: (sessionId: string) => Promise<void>;
        deleteSessionsByUserId: (userId: string) => Promise<void>;
    }> & Readonly<{
        getUser: (userId: string) => Promise<import("lucia").UserSchema | null>;
        setUser: (user: import("lucia").UserSchema, key: import("lucia").KeySchema | null) => Promise<void>;
        updateUser: (userId: string, partialUser: Partial<import("lucia").UserSchema>) => Promise<void>;
        deleteUser: (userId: string) => Promise<void>;
        getKey: (keyId: string) => Promise<import("lucia").KeySchema | null>;
        getKeysByUserId: (userId: string) => Promise<import("lucia").KeySchema[]>;
        setKey: (key: import("lucia").KeySchema) => Promise<void>;
        updateKey: (keyId: string, partialKey: Partial<import("lucia").KeySchema>) => Promise<void>;
        deleteKey: (keyId: string) => Promise<void>;
        deleteKeysByUserId: (userId: string) => Promise<void>;
    }>>>;
    middleware: import("lucia").Middleware<[{
        request: Request;
        set: {
            headers: Record<string, string> & {
                "Set-Cookie"?: string | string[] | undefined;
            };
            status?: number | undefined;
            redirect?: string | undefined;
        };
    }]>;
    getUserAttributes: (data: import("lucia").UserSchema) => {
        githubUsername: string;
    };
}>;
export declare const githubAuth: import("@lucia-auth/oauth/providers").GithubAuth<import("lucia").Auth<{
    env: "DEV" | "PROD";
    adapter: import("lucia").InitializeAdapter<Readonly<{
        getSessionAndUser?: ((sessionId: string) => Promise<[{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }, import("lucia").UserSchema] | [null, null]>) | undefined;
    } & Readonly<{
        getSession: (sessionId: string) => Promise<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        } | null>;
        getSessionsByUserId: (userId: string) => Promise<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }[]>;
        setSession: (session: {
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }) => Promise<void>;
        updateSession: (sessionId: string, partialSession: Partial<{
            id: string;
            active_expires: number;
            idle_expires: number;
            user_id: string;
        }>) => Promise<void>;
        deleteSession: (sessionId: string) => Promise<void>;
        deleteSessionsByUserId: (userId: string) => Promise<void>;
    }> & Readonly<{
        getUser: (userId: string) => Promise<import("lucia").UserSchema | null>;
        setUser: (user: import("lucia").UserSchema, key: import("lucia").KeySchema | null) => Promise<void>;
        updateUser: (userId: string, partialUser: Partial<import("lucia").UserSchema>) => Promise<void>;
        deleteUser: (userId: string) => Promise<void>;
        getKey: (keyId: string) => Promise<import("lucia").KeySchema | null>;
        getKeysByUserId: (userId: string) => Promise<import("lucia").KeySchema[]>;
        setKey: (key: import("lucia").KeySchema) => Promise<void>;
        updateKey: (keyId: string, partialKey: Partial<import("lucia").KeySchema>) => Promise<void>;
        deleteKey: (keyId: string) => Promise<void>;
        deleteKeysByUserId: (userId: string) => Promise<void>;
    }>>>;
    middleware: import("lucia").Middleware<[{
        request: Request;
        set: {
            headers: Record<string, string> & {
                "Set-Cookie"?: string | string[] | undefined;
            };
            status?: number | undefined;
            redirect?: string | undefined;
        };
    }]>;
    getUserAttributes: (data: import("lucia").UserSchema) => {
        githubUsername: string;
    };
}>>;
export type Auth = typeof auth;
//# sourceMappingURL=lucia.d.ts.map