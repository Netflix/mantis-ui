import { HardConstraints, SoftConstraints } from '@/types/constraints';
import { Label, MachineDefinition, MigrationConfig, Sla } from '@/types/machine';

export interface CompactJob {
  jarUrl: string;
  submittedAt: number;
  user: string;
  state: string;
  type: string;
  numStages: number;
  numWorkers: number;
  totCPUs: number;
  totMemory: number;
  statesSummary: StatesSummary;
  labels: Label[];
  jobId: string;
  env: string;
  region: string;
}

export interface StatesSummary {
  Started: number;
}

export interface Job {
  jobMetadata: JobMetadata;
  stageMetadataList: StageMetadata[];
  version: string;
  workerMetadataList: WorkerMetadata[];
  env: string;
  region: string;
}

export interface JobMetadata {
  jobId: string;
  name: string;
  user: string;
  submittedAt: number;
  startedAt: number;
  jarUrl: string;
  numStages: number;
  sla: Sla;
  state: string;
  subscriptionTimeoutSecs: number;
  parameters: Label[];
  nextWorkerNumberToUse: number;
  migrationConfig: MigrationConfig;
  labels: Label[];
}

export interface WorkerMetadata {
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
}

export interface StageMetadata {
  jobId: string;
  hardConstraints: HardConstraints[];
  machineDefinition: MachineDefinition;
  numStages: number;
  numWorkers: number;
  scalable: boolean;
  scalingPolicy: ScalingPolicy;
  softConstraints: SoftConstraints[];
  stageNum: number;
}

export interface ScalingPolicy {
  coolDownSecs: number;
  decrement: number;
  enabled: boolean;
  increment: number;
  max: number;
  min: number;
  stage: number;
}

export interface JobSummary {
  name: string;
  jobCount: number;
  totalCpus: number;
  totalMemory: number;
  totalWorkers: number;
  regions: string[];
  envs: string[];
}
