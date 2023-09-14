import Elysia from "elysia";
export declare const session: (app: Elysia) => Elysia<"", {
    store: {};
    error: {};
    request: {
        session: import("lucia").Session | null;
    };
    schema: {};
    meta: {
        schema: {};
        defs: {};
        exposed: {};
    };
}>;
//# sourceMappingURL=session.d.ts.map