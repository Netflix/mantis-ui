import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { fetchArtifacts } from '@/services/ArtifactService';
import { ENVS } from '@/services/BaseService';
import { Artifact } from '@/types/artifact';

export function useArtifacts() {
  return useQuery<Artifact[], Error>(Queries.ARTIFACTS, () => fetchArtifacts(ENVS));
}
