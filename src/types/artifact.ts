import { z } from 'zod';

export const ArtifactSchema = z.object({
  file: z.string(),
  key: z.string(),
  lastModified: z.number(),
  size: z.string(),
});
export type Artifact = z.infer<typeof ArtifactSchema>;
