import { Static } from "@sinclair/typebox";
export declare const QuestInput: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    archived: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    user_id: import("@sinclair/typebox").TString;
    user: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        github_username: import("@sinclair/typebox").TString;
    }>;
    index: import("@sinclair/typebox").TNumber;
    steps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        description: import("@sinclair/typebox").TString;
        done: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quest_id: import("@sinclair/typebox").TString;
    }>>;
}>;
export type QuestInputType = Static<typeof QuestInput>;
//# sourceMappingURL=QuestInput.d.ts.map