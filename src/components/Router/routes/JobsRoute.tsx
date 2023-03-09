import { lazy } from 'react';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobs } from '@/services/JobService';

const Jobs = lazy(() => import('@/components/Jobs/Jobs'));
const JobDetail = lazy(() => import('@/components/Jobs/JobDetail'));

export default [
  {
    path: AppRoutePaths.JOBS,
    handle: {
      breadcrumb: 'Jobs',
    },
    element: <Jobs />,
    loader() {
      void queryClient.prefetchQuery(Queries.JOBS, () => fetchJobs(REGION_ENVS));
      return {};
    },
  },
  {
    path: `${AppRoutePaths.JOBS}/:jobId`,
    handle: {
      breadcrumb: ({ jobId }: { jobId: string }) => jobId,
    },
    element: <JobDetail />,
  },
];
