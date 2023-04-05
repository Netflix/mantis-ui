/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface ImportMetaEnv {
  readonly VITE_ADMIN_GROUPS: string;
  readonly VITE_CUSTOM_MODULE_PREFIX: string;
  readonly VITE_SUPPORTED_ENVS: string;
  readonly VITE_SUPPORTED_REGIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
