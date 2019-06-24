import { Queries } from '@/lib/react-query';
import { fetchJobsSummary } from '@/services/JobService';
import { JobSummary } from '@/types/job';
import { useQuery } from 'react-query';

export function useJobSummary(envRegionList: string[]) {
  return useQuery<JobSummary[], Error>([Queries.SUMMARY, envRegionList], () =>
    fetchJobsSummary(
      envRegionList.map((list) => ({
        env: list.split(':')[0],
        region: list.split(':')[1],
      })),
    ),
  );
}
