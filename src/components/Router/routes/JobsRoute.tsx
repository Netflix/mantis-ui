import { Suspense } from 'react';

import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobs } from '@/services/JobService';

export default {
  meta: {
    breadcrumb: 'Jobs',
  },
  children: [
    {
      path: '/',
      element: () =>
        import('@/components/Jobs/Jobs').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
      loader() {
        void queryClient.prefetchQuery(Queries.JOBS, () => fetchJobs(REGION_ENVS));
        return {};
      },
    },
    {
      path: `:jobId`,
      meta: {
        breadcrumb: ({ jobId }: { jobId: string }) => jobId,
      },
      element: () =>
        import('@/components/JobDetail/JobDetail').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
    },
  ],
};
