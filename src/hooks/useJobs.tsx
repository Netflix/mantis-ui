import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJob, fetchJobs, killJobs } from '@/services/JobService';
import { CompactJob, Job } from '@/types/job';

export function useJobs() {
  return useQuery<Job[] | CompactJob[], Error>(Queries.JOBS, () => fetchJobs(REGION_ENVS));
}

export function useKillJobMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: killJobs,
    onSuccess: () => {
      void queryClient.invalidateQueries(Queries.JOBS);
    },
  });
}

export function useJob(env: string, region: string, jobId: string) {
  return useQuery<{ job: Job } | null, Error>(['jobId', jobId], () => fetchJob(env, region, jobId));
}
