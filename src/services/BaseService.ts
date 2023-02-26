import { Hooks } from 'ky';

import { createKyInstance } from '@/lib/ky';
import { ApiClientEntry } from '@/types/api';
import { flattenEnvObject } from '@/utils/env';

const mantisClients = [] as ApiClientEntry[];
export let MANTIS_ADMIN_GROUPS: string[] = [];
export let REGION_ENVS = [] as { env: string; region: string }[];
export let ENVS = [] as string[];
export const IS_PROD_STACK = window.location.origin.includes('prod.netflix');
export const IS_DEV_STACK = !IS_PROD_STACK;

export function setupApiClients(
  appUrls: { [key: string]: { [key: string]: string } },
  envsMap: { [key: string]: string[] },
  adminGroups: string[],
  kyHooks: Hooks,
) {
  Object.entries(envsMap).forEach(([env, regions]) => {
    if (Array.isArray(regions)) {
      regions.forEach((region: string) => {
        mantisClients.push({
          env,
          region,
          url: appUrls[env][region],
          client: createKyInstance(appUrls[env][region], kyHooks),
        });
      });
    }
  });

  REGION_ENVS = flattenEnvObject(envsMap);
  ENVS = Object.keys(envsMap);
  MANTIS_ADMIN_GROUPS = adminGroups;
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

export function getApiClientEntries() {
  return mantisClients;
}

export function getServiceResponseError(response: Response) {
  if (response && response.status && response.statusText) {
    return {
      code: response.status,
      message: response.statusText,
    };
  }
  return { code: 1, message: 'Request failed with an unexpected error.' };
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
