import { HardConstraints, SoftConstraints } from '@/types/constraints';
import { Label, MachineDefinition, MigrationConfig, Sla } from '@/types/machine';

export interface ClusterListItem {
  name: string;
  labels: Label[];
  versions: Version[];
  owners: string[];
}

export interface Version {
  env: string;
  region: string;
  version: string;
  disabled: boolean;
}

export interface Cluster {
  name: string;
  jars: Jar[];
  sla: Sla;
  parameters: Label[];
  owner: Owner;
  lastJobCount: number;
  disabled: boolean;
  isReadyForJobMaster: boolean;
  migrationConfig: MigrationConfig;
  labels: Label[];
  cronActive: boolean;
  latestVersion: string;
}

export interface Jar {
  url: string;
  uploadedAt: number;
  version: string;
  schedulingInfo: SchedulingInfo;
}

export interface SchedulingInfo {
  stages: { [key: number]: Stage };
}

export interface Stage {
  numberOfInstances: number;
  machineDefinition: MachineDefinition;
  hardConstraints: HardConstraints[];
  softConstraints: SoftConstraints[];
  scalingPolicy: null;
  scalable: boolean;
}

export interface Owner {
  name: string;
  teamName: string;
  description: string;
  contactEmail: string;
  repo: string;
}
