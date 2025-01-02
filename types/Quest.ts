import { Step, StepInput } from "./Step";

export interface Quest {
  id: string;
  index: number;
  name: string;
  steps: Step[];
}

export interface QuestInput {
  index: number;
  name: string;
  id?: string;
  steps: StepInput[];
}
