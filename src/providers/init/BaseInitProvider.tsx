import type { Options } from 'ky';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { setupMirage } from '@/mirage';
import { setupApiClients } from '@/services/BaseService';
import { showErrorNotification } from '@/utils/notifications';

function InitProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const mode = import.meta.env.MODE;
      const { ADMIN_GROUPS, API_URLS, ENVS_MAP } = import.meta.glob('/src/config/*.ts', {
        eager: true,
      })[`/src/config/${mode}.ts`] as {
        ADMIN_GROUPS: string[];
        API_URLS: { [key: string]: { [key: string]: string } };
        ENVS_MAP: { [key: string]: string[] };
      };
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

      // Setup MirageJS to mock APIs
      setupMirage();

      setupApiClients(API_URLS, ENVS_MAP, ADMIN_GROUPS, clientHooks);
    }
  }, []);

  return children;
}

export default InitProvider;
