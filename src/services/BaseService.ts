import type { Options } from 'ky';

import { createKyInstance } from '@/lib/ky';
import type { ApiClientEntry, Env, EnvRegion, Region } from '@/types/api';
import { showErrorNotification } from '@/utils/notifications';

let mantisClients = [] as ApiClientEntry[];
export const ENVS = (
  typeof import.meta.env.VITE_SUPPORTED_ENVS === 'string'
    ? import.meta.env.VITE_SUPPORTED_ENVS.split(',')
    : []
) as Env[];
export const REGIONS = (
  typeof import.meta.env.VITE_SUPPORTED_REGIONS === 'string'
    ? import.meta.env.VITE_SUPPORTED_REGIONS.split(',')
    : []
) as Region[];
export const MANTIS_ADMIN_GROUPS: string[] =
  typeof import.meta.env.VITE_ADMIN_GROUPS === 'string'
    ? import.meta.env.VITE_ADMIN_GROUPS.split(',')
    : [];
export const REGION_ENVS = getAvailableEnvRegions();

export function setupApiClients(apiUrls: { env: Env; region: Region; url: string }[]) {
  const clientHooks = {
    beforeRequest: [],
    beforeRetry: [],
    afterResponse: [
      async (_request: Request, _options: Options, response: Response) => {
        if (!response.ok) {
          showErrorNotification(
            response.statusText,
            `Request ${response.url} failed with code ${response.status}`,
          );
          return Promise.reject(response);
        }
        return response;
      },
    ],
  };
  mantisClients = apiUrls.map(({ env, region, url }) => ({
    env,
    region,
    url,
    client: createKyInstance(url, clientHooks),
  }));
}

export function getApiClientEntryForRegion(env: string, region: string) {
  const apiClients = mantisClients;
  const apiClientEntry = apiClients.find((entry) => {
    return entry.env === env && entry.region === region;
  });
  if (!apiClientEntry) {
    throw new Error(`Client requested for invalid region: ${env}.${region}`);
  }
  return apiClientEntry;
}

export function getApiClientEntryForEnv(env: string) {
  const apiClients = mantisClients;
  const apiClientEntry = apiClients.find((entry) => {
    return entry.env === env;
  });
  if (!apiClientEntry) {
    throw new Error(`Client requested for invalid env: ${env}`);
  }
  return apiClientEntry;
}

export function getApiClientEntries() {
  return mantisClients;
}

export function getServiceResponseError(response: Response) {
  if (response?.status && response?.statusText) {
    return {
      code: response.status,
      message: response.statusText,
    };
  }
  return { code: 1, message: 'Request failed with an unexpected error.' };
}

export function getAvailableRegionsMap() {
  return ENVS.reduce<{ [key in Env]: Region[] }>(
    (acc, env) => {
      acc[env] = REGIONS;
      return acc;
    },
    { prod: [], test: [] },
  );
}

export function getAvailableEnvRegions() {
  const regionsMap = getAvailableRegionsMap();
  return Object.keys(regionsMap).flatMap(
    (env) => regionsMap[env as Env].map((region: Region) => ({ env, region })) as EnvRegion[],
  );
}

export function createSseEventSource(
  url: string,
  onOpen: ((this: EventSource, ev: Event) => void) | null,
  onMessage: ((this: EventSource, ev: Event) => void) | null,
  onError: ((this: EventSource, ev: Event) => void) | null,
) {
  const eventSource = new EventSource(url);
  eventSource.onopen = onOpen;
  eventSource.onmessage = onMessage;
  eventSource.onerror = onError;
  return eventSource;
}

export function createWebsocket(
  url: string,
  onOpen: (...args: unknown[]) => void,
  onMessage: ((this: WebSocket, ev: MessageEvent) => void) | null,
  onError: ((this: WebSocket, ev: Event) => void) | null,
  onClose: ((this: WebSocket, ev: CloseEvent) => void) | null,
) {
  const connection = new WebSocket(url);
  connection.onopen = onOpen;
  connection.onmessage = onMessage;
  connection.onerror = onError;
  connection.onclose = onClose;
  return connection;
}
