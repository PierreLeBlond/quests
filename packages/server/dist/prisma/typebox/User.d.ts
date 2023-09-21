import { Static } from "@sinclair/typebox";
export declare const User: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    auth_session: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        user_id: import("@sinclair/typebox").TString;
        active_expires: import("@sinclair/typebox").TInteger;
        idle_expires: import("@sinclair/typebox").TInteger;
    }>>;
    key: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        hashed_password: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        user_id: import("@sinclair/typebox").TString;
    }>>;
    quests: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        archived: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        user_id: import("@sinclair/typebox").TString;
        index: import("@sinclair/typebox").TNumber;
    }>>;
    github_username: import("@sinclair/typebox").TString;
}>;
export type UserType = Static<typeof User>;
//# sourceMappingURL=User.d.ts.map