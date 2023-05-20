import { z } from 'zod';

export const HardConstraintsSchema = z.object({
  id: z.number(),
});
export type HardConstraints = z.infer<typeof HardConstraintsSchema>;

export const SoftConstraintsSchema = z.object({
  id: z.number(),
});
export type SoftConstraints = z.infer<typeof SoftConstraintsSchema>;
