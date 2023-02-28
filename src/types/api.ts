import type { KyInstance } from 'ky/distribution/types/ky';

export interface ApiClientEntry {
  env: string;
  region: string;
  url: string;
  client: KyInstance;
}

export interface EnvRegion {
  env: string;
  region: string;
}
