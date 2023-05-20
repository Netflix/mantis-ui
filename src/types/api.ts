import type { KyInstance } from 'ky/distribution/types/ky';
import { z } from 'zod';

export type ApiClientEntry = {
  client: KyInstance;
  env: string;
  region: string;
  url: string;
};

const EnvSchema = z.union([z.literal('prod'), z.literal('test')]);
export type Env = z.infer<typeof EnvSchema>;

const RegionSchema = z.union([
  z.literal('eu-west-1'),
  z.literal('us-east-1'),
  z.literal('us-east-2'),
  z.literal('us-west-2'),
]);
export type Region = z.infer<typeof RegionSchema>;

const EnvRegionSchema = z.object({
  env: z.string(),
  region: z.string(),
});
export type EnvRegion = z.infer<typeof EnvRegionSchema>;
