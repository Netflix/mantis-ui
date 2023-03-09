import { lazy } from 'react';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobsSummary } from '@/services/JobService';

const Summary = lazy(() => import('@/components/Summary'));

export default [
  {
    path: AppRoutePaths.SUMMARY,
    handle: {
      breadcrumb: 'Summary',
    },
    element: <Summary />,
    loader() {
      const envRegionList = REGION_ENVS.map((item) => `${item.env}:${item.region}`);
      void queryClient.prefetchQuery([Queries.SUMMARY, envRegionList], () =>
        fetchJobsSummary(REGION_ENVS),
      );
      return {};
    },
  },
];
