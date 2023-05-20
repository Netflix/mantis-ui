import { z } from 'zod';

export const MachineDefinitionSchema = z.object({
  cpuCores: z.number(),
  diskMB: z.number(),
  memoryMB: z.number(),
  networkMbps: z.number(),
  numPorts: z.number(),
});
export type MachineDefinition = z.infer<typeof MachineDefinitionSchema>;

export const LabelSchema = z.object({
  name: z.string(),
  value: z.string(),
});
export type Label = z.infer<typeof LabelSchema>;

export const SlaSchema = z.object({
  durationType: z.string(),
  max: z.number(),
  min: z.number(),
  minRuntimeSecs: z.number(),
  runtimeLimitSecs: z.number(),
  slaType: z.string(),
  userProvidedType: z.string(),
});
export type Sla = z.infer<typeof SlaSchema>;

export const MigrationConfigSchema = z.object({
  configString: z.string(),
  strategy: z.string(),
});
export type MigrationConfig = z.infer<typeof MigrationConfigSchema>;
