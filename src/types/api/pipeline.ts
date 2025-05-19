export interface BaseModel {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string | null;
}

export enum Status {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Success = "success",
  Failed = "failed",
  Stopped = "stopped",
}

export interface PipelineTemplate extends BaseModel {
  name: string;
  description: string;

  steps: StepTemplate[];
  running_jobs: Job[];
}

export interface StepTemplate extends BaseModel {
  type: string;
  name: string;
  description: string;
  config: string;
}

export interface Job extends BaseModel {
  pipelineID: number;
  status: Status;
  runBy: string;
  started_at: string | null;
  ended_at: string | null;
  result: string;

  pipeline: PipelineTemplate;
  steps: Step[];
}

export interface Step extends BaseModel {
  jobID: number;
  stepTemplateID: number;
  status: Status;
  log: string;
  result: string;
  started_at: string | null;
  ended_at: string | null;
  executionOrder: number;

  job?: Job;
  step_template?: StepTemplate;
}
