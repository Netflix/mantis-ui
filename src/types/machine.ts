export interface MachineDefinition {
  cpuCores: number;
  memoryMB: number;
  networkMbps: number;
  diskMB: number;
  numPorts: number;
}

export interface Label {
  name: string;
  value: string;
}

export interface Sla {
  runtimeLimitSecs: number;
  minRuntimeSecs: number;
  slaType: string;
  durationType: string;
  userProvidedType: string;
}

export interface MigrationConfig {
  strategy: string;
  configString: string;
}
