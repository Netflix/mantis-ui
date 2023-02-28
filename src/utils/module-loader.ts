import { logErrorMessage } from '@/utils/logger';

const DEFAULT = 'Base';

const mode = import.meta.env.MODE;
const { CUSTOM_MODULE_SUFFIX } = import.meta.glob('/src/config/*.ts', { eager: true })[
  `/src/config/${mode}.ts`
] as {
  CUSTOM_MODULE_SUFFIX: 'string';
};

const MODULE_SUFFIX = CUSTOM_MODULE_SUFFIX ? CUSTOM_MODULE_SUFFIX : DEFAULT;

// Reference: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

export async function loadLibModule<T>(dir: string, fileName: string): Promise<{ default: T }> {
  let module: Promise<{ default: T }>;

  try {
    module = (await import(`../lib/${dir}/${MODULE_SUFFIX}${fileName}.ts`)) as Promise<{
      default: T;
    }>;
  } catch (err) {
    logErrorMessage((err as Error).message);
    return Promise.reject(err);
  }

  return module;
}

export async function loadProviderModule<T>(
  dir: string,
  fileName: string,
): Promise<{ default: T }> {
  let module: Promise<{ default: T }>;

  try {
    module = (await import(`../providers/${dir}/${MODULE_SUFFIX}${fileName}.tsx`)) as Promise<{
      default: T;
    }>;
  } catch (err) {
    logErrorMessage((err as Error).message);
    return Promise.reject(err);
  }

  return module;
}

export async function loadComponentModule<T>(
  dir: string,
  fileName: string,
): Promise<{ default: T }> {
  let module: Promise<{ default: T }>;

  try {
    module = (await import(`../components/${dir}/${MODULE_SUFFIX}${fileName}.tsx`)) as Promise<{
      default: T;
    }>;
  } catch (err) {
    logErrorMessage((err as Error).message);
    return Promise.reject(err);
  }

  return module;
}
