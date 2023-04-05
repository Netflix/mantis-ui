import type { HardConstraints, SoftConstraints } from '@/types/constraints';
import type { Label, MachineDefinition, MigrationConfig, Sla } from '@/types/machine';

export type ClusterListItem = {
  labels: Label[];
  name: string;
  owners: string[];
  versions: Version[];
};

export type Version = {
  disabled: boolean;
  env: string;
  region: string;
  version: string;
};

export type Cluster = {
  cronActive: boolean;
  disabled: boolean;
  isReadyForJobMaster: boolean;
  jars: Jar[];
  labels: Label[];
  lastJobCount: number;
  latestVersion: string;
  migrationConfig: MigrationConfig;
  name: string;
  owner: Owner;
  parameters: Label[];
  sla: Sla;
};

export type Jar = {
  schedulingInfo: SchedulingInfo;
  uploadedAt: number;
  url: string;
  version: string;
};

export type SchedulingInfo = {
  stages: { [key: number]: Stage };
};

export type Stage = {
  hardConstraints: HardConstraints[];
  machineDefinition: MachineDefinition;
  numberOfInstances: number;
  scalable: boolean;
  scalingPolicy: null;
  softConstraints: SoftConstraints[];
};

export type Owner = {
  contactEmail: string;
  description: string;
  name: string;
  repo: string;
  teamName: string;
};
