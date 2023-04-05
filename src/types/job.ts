import type { HardConstraints, SoftConstraints } from '@/types/constraints';
import type { Label, MachineDefinition, MigrationConfig, Sla } from '@/types/machine';

export type CompactJob = {
  env: string;
  jarUrl: string;
  jobId: string;
  labels: Label[];
  numStages: number;
  numWorkers: number;
  region: string;
  state: string;
  statesSummary: StatesSummary;
  submittedAt: number;
  totCPUs: number;
  totMemory: number;
  type: string;
  user: string;
};

export type StatesSummary = {
  Started: number;
};

export type Job = {
  env: string;
  jobMetadata: JobMetadata;
  region: string;
  stageMetadataList: StageMetadata[];
  version: string;
  workerMetadataList: WorkerMetadata[];
};

export type JobMetadata = {
  jarUrl: string;
  jobId: string;
  labels: Label[];
  migrationConfig: MigrationConfig;
  name: string;
  nextWorkerNumberToUse: number;
  numStages: number;
  parameters: Label[];
  sla: Sla;
  startedAt: number;
  state: string;
  submittedAt: number;
  subscriptionTimeoutSecs: number;
  user: string;
};

export type WorkerMetadata = {
  acceptedAt: number;
  cluster: string;
  completedAt: number;
  consolePort: number;
  customPort: number;
  debugPort: number;
  jobId: string;
  launchedAt: number;
  metricsPort: number;
  numberOfPorts: number;
  ports: number[];
  reason: string;
  resubmitOf: number;
  slave: string;
  slaveID: string;
  stageNum: number;
  startedAt: number;
  startingAt: number;
  state: string;
  totalResubmitCount: number;
  workerIndex: number;
  workerNumber: number;
};

export type StageMetadata = {
  hardConstraints: HardConstraints[];
  jobId: string;
  machineDefinition: MachineDefinition;
  numStages: number;
  numWorkers: number;
  scalable: boolean;
  scalingPolicy: ScalingPolicy;
  softConstraints: SoftConstraints[];
  stageNum: number;
};

export type ScalingPolicy = {
  coolDownSecs: number;
  decrement: number;
  enabled: boolean;
  increment: number;
  max: number;
  min: number;
  stage: number;
};

export type JobSummary = {
  envs: string[];
  jobCount: number;
  name: string;
  regions: string[];
  totalCpus: number;
  totalMemory: number;
  totalWorkers: number;
};
