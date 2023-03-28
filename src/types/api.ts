import type { KyInstance } from 'ky/distribution/types/ky';

export interface ApiClientEntry {
  client: KyInstance;
  env: string;
  region: string;
  url: string;
}

export type Env = 'prod' | 'test';

export type Region = 'eu-west-1' | 'us-east-1' | 'us-east-2' | 'us-west-2';

export interface EnvRegion {
  env: string;
  region: string;
}
