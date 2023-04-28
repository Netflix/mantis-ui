import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import {
  fetchJobClusterByName,
  fetchJobClusters,
  fetchJobsOnCluster,
} from '@/services/JobClusterService';
import { killJobs } from '@/services/JobService';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

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

export function useJobsOnCluster(clusterName: string) {
  return useQuery({
    queryKey: [Queries.CLUSTER_DETAILS, clusterName, Queries.JOBS_ON_CLUSTER],
    queryFn: () => fetchJobsOnCluster(REGION_ENVS, clusterName),
  });
}

export function useKillJobMutation(clusterName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: killJobs,
    onSuccess: () => {
      void queryClient.invalidateQueries([
        Queries.CLUSTER_DETAILS,
        clusterName,
        Queries.JOBS_ON_CLUSTER,
      ]);
      showSuccessNotification('Job killed successfully.', 'Kill Job');
    },
    onError: (error: Error) => {
      showErrorNotification(`Failed to kill job due to ${error.toString()}`, 'Kill Job');
    },
  });
}
