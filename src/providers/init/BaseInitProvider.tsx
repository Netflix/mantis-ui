import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { setupMirage } from '@/mirage';
import { REGION_ENVS, setupApiClients } from '@/services/BaseService';
import type { Env, Region } from '@/types/api';

function InitProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const apiUrls = REGION_ENVS.map(({ env, region }) => ({
        env: env as Env,
        region: region as Region,
        url: `https://mantisapi.${region}.${env}.netflix.net`,
      }));

      // Setup MirageJS to mock APIs
      setupMirage(apiUrls);

      setupApiClients(apiUrls);
    }
  }, []);

  return children;
}

export default InitProvider;
