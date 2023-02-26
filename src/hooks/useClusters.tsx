import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobClusters } from '@/services/JobClusterService';
import { ClusterListItem } from '@/types/cluster';

export function useClusters() {
  return useQuery<ClusterListItem[], Error>(Queries.CLUSTERS, () => fetchJobClusters(REGION_ENVS));
}
