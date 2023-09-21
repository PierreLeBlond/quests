import { Static } from "@sinclair/typebox";
export declare const Step: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    done: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    quest_id: import("@sinclair/typebox").TString;
    quest: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        archived: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        user_id: import("@sinclair/typebox").TString;
        index: import("@sinclair/typebox").TNumber;
    }>;
}>;
export type StepType = Static<typeof Step>;
//# sourceMappingURL=Step.d.ts.map