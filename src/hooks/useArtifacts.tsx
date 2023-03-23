import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { fetchArtifacts } from '@/services/ArtifactService';
import { ENVS } from '@/services/BaseService';

export function useArtifacts() {
  return useQuery({
    queryKey: [Queries.ARTIFACTS],
    queryFn: () => fetchArtifacts(ENVS),
  });
}
