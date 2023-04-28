export type MachineDefinition = {
  cpuCores: number;
  diskMB: number;
  memoryMB: number;
  networkMbps: number;
  numPorts: number;
};

export type Label = {
  name: string;
  value: string;
};

export type Sla = {
  durationType: string;
  max: number;
  min: number;
  minRuntimeSecs: number;
  runtimeLimitSecs: number;
  slaType: string;
  userProvidedType: string;
};

export type MigrationConfig = {
  configString: string;
  strategy: string;
};
