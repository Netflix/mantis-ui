import { z } from 'zod';

import { HardConstraintsSchema, SoftConstraintsSchema } from '@/types/constraints';
import {
  LabelSchema,
  MachineDefinitionSchema,
  MigrationConfigSchema,
  SlaSchema,
} from '@/types/machine';

const statesSummarySchema = z.object({
  Started: z.number(),
});
export type StatesSummary = z.infer<typeof statesSummarySchema>;

const compactJobSchema = z.object({
  env: z.string(),
  jarUrl: z.string(),
  jobId: z.string(),
  labels: z.array(LabelSchema),
  numStages: z.number(),
  numWorkers: z.number(),
  region: z.string(),
  state: z.string(),
  statesSummary: statesSummarySchema,
  submittedAt: z.number(),
  totCPUs: z.number(),
  totMemory: z.number(),
  type: z.string(),
  user: z.string(),
});
export type CompactJob = z.infer<typeof compactJobSchema>;

const jobMetadataSchema = z.object({
  jarUrl: z.string(),
  jobId: z.string(),
  labels: z.array(LabelSchema),
  migrationConfig: MigrationConfigSchema,
  name: z.string(),
  nextWorkerNumberToUse: z.number(),
  numStages: z.number(),
  parameters: z.array(LabelSchema),
  sla: SlaSchema,
  startedAt: z.number(),
  state: z.string(),
  submittedAt: z.number(),
  subscriptionTimeoutSecs: z.number(),
  user: z.string(),
});
export type JobMetadata = z.infer<typeof jobMetadataSchema>;

const workerMetadataSchema = z.object({
  acceptedAt: z.number(),
  cluster: z.string(),
  completedAt: z.number(),
  consolePort: z.number(),
  customPort: z.number(),
  debugPort: z.number(),
  jobId: z.string(),
  launchedAt: z.number(),
  metricsPort: z.number(),
  numberOfPorts: z.number(),
  ports: z.array(z.number()),
  reason: z.string(),
  resubmitOf: z.number(),
  slave: z.string(),
  slaveID: z.string(),
  stageNum: z.number(),
  startedAt: z.number(),
  startingAt: z.number(),
  state: z.string(),
  totalResubmitCount: z.number(),
  workerIndex: z.number(),
  workerNumber: z.number(),
});
export type WorkerMetadata = z.infer<typeof workerMetadataSchema>;

const stageMetadataSchema = z.object({
  hardConstraints: z.array(HardConstraintsSchema),
  jobId: z.string(),
  machineDefinition: MachineDefinitionSchema,
  numStages: z.number(),
  numWorkers: z.number(),
  scalable: z.boolean(),
  scalingPolicy: z.null(),
  softConstraints: z.array(SoftConstraintsSchema),
  stageNum: z.number(),
});
export type StageMetadata = z.infer<typeof stageMetadataSchema>;

const jobSchema = z.object({
  env: z.string(),
  jobMetadata: jobMetadataSchema,
  region: z.string(),
  stageMetadataList: z.array(stageMetadataSchema),
  version: z.string(),
  workerMetadataList: z.array(workerMetadataSchema),
});
export type Job = z.infer<typeof jobSchema>;

const jobSummarySchema = z.object({
  envs: z.array(z.string()),
  jobCount: z.number(),
  name: z.string(),
  regions: z.array(z.string()),
  totalCpus: z.number(),
  totalMemory: z.number(),
  totalWorkers: z.number(),
});
export type JobSummary = z.infer<typeof jobSummarySchema>;

const killJobPayloadSchema = z.object({
  env: z.string(),
  jobId: z.string(),
  region: z.string(),
});
export type KillJobPayload = z.infer<typeof killJobPayloadSchema>;

const ScalingPolicySchema = z.object({
  coolDownSecs: z.number(),
  decrement: z.number(),
  enabled: z.boolean(),
  increment: z.number(),
  max: z.number(),
  min: z.number(),
  stage: z.number(),
});
export type ScalingPolicy = z.infer<typeof ScalingPolicySchema>;
