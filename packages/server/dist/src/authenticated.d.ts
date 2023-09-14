import Elysia from "elysia";
export declare const authenticated: (app: Elysia) => Elysia<"", {
    store: {};
    error: {};
    request: {
        session: import("lucia").Session | null;
    } & {
        session: import("lucia").Session;
    };
    schema: {};
    meta: {
        schema: {};
        defs: {};
        exposed: {};
    };
}>;
//# sourceMappingURL=authenticated.d.ts.map