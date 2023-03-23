import type { HardConstraints, SoftConstraints } from '@/types/constraints';
import type { Label, MachineDefinition, MigrationConfig, Sla } from '@/types/machine';

export interface ClusterListItem {
  labels: Label[];
  name: string;
  owners: string[];
  versions: Version[];
}

export interface Version {
  disabled: boolean;
  env: string;
  region: string;
  version: string;
}

export interface Cluster {
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
}

export interface Jar {
  schedulingInfo: SchedulingInfo;
  uploadedAt: number;
  url: string;
  version: string;
}

export interface SchedulingInfo {
  stages: { [key: number]: Stage };
}

export interface Stage {
  hardConstraints: HardConstraints[];
  machineDefinition: MachineDefinition;
  numberOfInstances: number;
  scalable: boolean;
  scalingPolicy: null;
  softConstraints: SoftConstraints[];
}

export interface Owner {
  contactEmail: string;
  description: string;
  name: string;
  repo: string;
  teamName: string;
}
