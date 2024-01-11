export interface Step {
  id: string;
  index: number;
  description: string;
  done: boolean;
}

export interface StepInput {
  id?: string;
  index: number;
  description: string;
  done: boolean;
}
