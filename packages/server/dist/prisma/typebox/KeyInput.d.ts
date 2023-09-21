import { Static } from "@sinclair/typebox";
export declare const KeyInput: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    hashed_password: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    user_id: import("@sinclair/typebox").TString;
    user: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        github_username: import("@sinclair/typebox").TString;
    }>;
}>;
export type KeyInputType = Static<typeof KeyInput>;
//# sourceMappingURL=KeyInput.d.ts.map