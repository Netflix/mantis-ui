export interface MachineDefinition {
  cpuCores: number;
  diskMB: number;
  memoryMB: number;
  networkMbps: number;
  numPorts: number;
}

export interface Label {
  name: string;
  value: string;
}

export interface Sla {
  durationType: string;
  max: number;
  min: number;
  minRuntimeSecs: number;
  runtimeLimitSecs: number;
  slaType: string;
  userProvidedType: string;
}

export interface MigrationConfig {
  configString: string;
  strategy: string;
}
