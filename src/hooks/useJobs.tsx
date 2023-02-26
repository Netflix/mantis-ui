import { useQuery } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobs } from '@/services/JobService';
import { CompactJob, Job } from '@/types/job';

export function useJobs() {
  return useQuery<Job[] | CompactJob[], Error>(Queries.JOBS, () => fetchJobs(REGION_ENVS));
}
