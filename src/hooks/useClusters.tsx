import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobClusterByName, fetchJobClusters } from '@/services/JobClusterService';

export function useClusters() {
  return useQuery({
    queryKey: [Queries.CLUSTERS],
    queryFn: () => fetchJobClusters(REGION_ENVS),
  });
}

export function useClusterDetails(clusterName: string) {
  const shouldFetch = Boolean(clusterName);
  return useQuery({
    queryKey: [Queries.CLUSTER_DETAILS, clusterName],
    queryFn: () => fetchJobClusterByName(REGION_ENVS, clusterName),
    enabled: shouldFetch,
  });
}
