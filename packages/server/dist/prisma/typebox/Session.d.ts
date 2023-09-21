import { Static } from "@sinclair/typebox";
export declare const Session: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    user_id: import("@sinclair/typebox").TString;
    active_expires: import("@sinclair/typebox").TInteger;
    idle_expires: import("@sinclair/typebox").TInteger;
    user: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        github_username: import("@sinclair/typebox").TString;
    }>;
}>;
export type SessionType = Static<typeof Session>;
//# sourceMappingURL=Session.d.ts.map