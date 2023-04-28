import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJob, fetchJobs, killJobs } from '@/services/JobService';
import type { CompactJob, Job } from '@/types/job';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

export function useJobs() {
  return useQuery<CompactJob[] | Job[], Error>(Queries.JOBS, () => fetchJobs(REGION_ENVS));
}

export function useKillJobMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: killJobs,
    onSuccess: () => {
      void queryClient.invalidateQueries(Queries.JOBS);
      showSuccessNotification('Job killed successfully.', 'Kill Job');
    },
    onError: (error: Error) => {
      showErrorNotification(`Failed to kill job due to ${error.toString()}`, 'Kill Job');
    },
  });
}

export function useJob(env: string, region: string, jobId: string) {
  return useQuery(Queries.JOB, () => fetchJob(env, region, jobId));
}
