import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobClusters } from '@/services/JobClusterService';

export function useClusters() {
  return useQuery({
    queryKey: [Queries.CLUSTERS],
    queryFn: () => fetchJobClusters(REGION_ENVS),
  });
}
