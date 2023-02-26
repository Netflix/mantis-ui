import { showNotification } from '@mantine/notifications';
import { Options } from 'ky';
import { ReactNode, useEffect } from 'react';

import { setupApiClients } from '@/services/BaseService';

function InitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mode = import.meta.env.MODE;
    const { API_URLS, ENVS_MAP, ADMIN_GROUPS } = import.meta.globEager('/src/config/*.ts')[
      `/src/config/${mode}.ts`
    ] as {
      API_URLS: { [key: string]: { [key: string]: string } };
      ENVS_MAP: { [key: string]: string[] };
      ADMIN_GROUPS: string[];
    };
    const clientHooks = {
      beforeRequest: [],
      beforeRetry: [],
      afterResponse: [
        async (_request: Request, _options: Options, response: Response) => {
          if (!response.ok) {
            showNotification({
              title: `Request ${response.url} failed with code ${response.status}`,
              message: response.statusText,
              color: 'red',
            });
            return Promise.reject(response);
          }
          return response;
        },
      ],
    };

    setupApiClients(API_URLS, ENVS_MAP, ADMIN_GROUPS, clientHooks);
  }, []);

  return children;
}

export default InitProvider;
