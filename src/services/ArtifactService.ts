import ky from 'ky';

import { getApiClientEntryForEnv } from '@/services/BaseService';
import type { Artifact } from '@/types/artifact';

export async function fetchArtifacts(envs: string[]) {
  // Fix this API call to not call hard coded UI APIs
  const requests = envs.map((env) =>
    ky.get(`https://mantis.us-east-1.${env}.netflix.net/library/list`).json(),
  );
  const responses = await Promise.allSettled(requests);
  const data = responses.flatMap((response, index) => {
    if (response.status === 'fulfilled') {
      const items = response.value as Artifact[];
      return items.map((item) => ({
        ...item,
        lastModified: item.lastModified * 1000,
        env: envs[index],
      }));
    }
    return [];
  });
  return data;
}

export function uploadArtifacts(artifact: Artifact, envs: string[]) {
  envs.map((env) => {
    const { client } = getApiClientEntryForEnv(env);

    const data = client.post(`api/v1/artifacts`, {
      json: artifact,
    });
    return data.json<Artifact>();
  });
}
