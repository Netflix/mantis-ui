import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Queries } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobs, killJobs } from '@/services/JobService';
import { CompactJob, Job } from '@/types/job';
import { useAuth } from '@/hooks/useAuth';

export function useJobs() {
  const { data = [] } = useQuery<Job[] | CompactJob[], Error>(Queries.JOBS, () =>
    fetchJobs(REGION_ENVS),
  );
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutateAsync: killJobsMutation } = useMutation(
    (jobs: CompactJob[]) => killJobs(jobs, user?.email as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(Queries.JOBS).catch((e) => console.error(e));
      },
      onError: (e: any) => {
        console.error(e);
        throw new Error('Error killing jobs');
      },
    },
  );

  return { data, killJobsMutation };
}
