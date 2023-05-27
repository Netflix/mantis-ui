import { z } from 'zod';

import { HardConstraintsSchema, SoftConstraintsSchema } from '@/types/constraints';
import {
  LabelSchema,
  MachineDefinitionSchema,
  MigrationConfigSchema,
  SlaSchema,
} from '@/types/machine';

const VersionSchema = z.object({
  disabled: z.boolean(),
  env: z.string(),
  region: z.string(),
  version: z.string(),
});
export type Version = z.infer<typeof VersionSchema>;

const OwnerSchema = z.object({
  contactEmail: z.string(),
  description: z.string(),
  name: z.string(),
  repo: z.string(),
  teamName: z.string(),
});
export type Owner = z.infer<typeof OwnerSchema>;

const ClusterListItemSchema = z.object({
  labels: z.array(LabelSchema),
  name: z.string(),
  owners: z.array(z.string()),
  versions: z.array(VersionSchema),
});
export type ClusterListItem = z.infer<typeof ClusterListItemSchema>;

const StageSchema = z.object({
  hardConstraints: z.array(HardConstraintsSchema),
  machineDefinition: MachineDefinitionSchema,
  numberOfInstances: z.number(),
  scalable: z.boolean(),
  scalingPolicy: z.null(),
  softConstraints: z.array(SoftConstraintsSchema),
});
export type Stage = z.infer<typeof StageSchema>;

const SchedulingInfoSchema = z.object({
  stages: z.record(StageSchema),
});
export type SchedulingInfo = z.infer<typeof SchedulingInfoSchema>;

const JarSchema = z.object({
  schedulingInfo: SchedulingInfoSchema,
  uploadedAt: z.number(),
  url: z.string(),
  version: z.string(),
});
export type Jar = z.infer<typeof JarSchema>;

const ClusterSchema = z.object({
  cronActive: z.boolean(),
  disabled: z.boolean(),
  isReadyForJobMaster: z.boolean(),
  jars: z.array(JarSchema),
  labels: z.array(LabelSchema),
  lastJobCount: z.number(),
  latestVersion: z.string(),
  migrationConfig: MigrationConfigSchema,
  name: z.string(),
  owner: OwnerSchema,
  parameters: z.array(LabelSchema),
  sla: SlaSchema,
});
export type Cluster = z.infer<typeof ClusterSchema>;
