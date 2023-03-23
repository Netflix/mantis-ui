import type { KyInstance } from 'ky/distribution/types/ky';

export interface ApiClientEntry {
  client: KyInstance;
  env: string;
  region: string;
  url: string;
}

export interface EnvRegion {
  env: string;
  region: string;
}
