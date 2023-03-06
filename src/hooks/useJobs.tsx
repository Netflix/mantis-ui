import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJob, fetchJobs } from '@/services/JobService';
import { CompactJob, Job } from '@/types/job';

export function useJobs() {
  return useQuery<Job[] | CompactJob[], Error>(Queries.JOBS, () => fetchJobs(REGION_ENVS));
}

export function useJob(jobId: string) {
  return useQuery<Job | null, Error>(['jobId', jobId], () => fetchJob(REGION_ENVS, jobId));
}
