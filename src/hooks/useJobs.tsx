import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobs } from '@/services/JobService';
import { CompactJob, Job } from '@/types/job';
import { useQuery } from 'react-query';

export function useJobs() {
  return useQuery<Job[] | CompactJob[], Error>(Queries.JOBS, () => fetchJobs(REGION_ENVS));
}
