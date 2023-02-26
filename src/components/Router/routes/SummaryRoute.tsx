import { Suspense } from 'react';

import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobsSummary } from '@/services/JobService';

export default {
  element: () =>
    import('@/components/Summary/Summary').then((module) => (
      <>
        <Suspense fallback={<LoadingFallback />}>
          <module.default />
        </Suspense>
      </>
    )),
  loader() {
    const envRegionList = REGION_ENVS.map((item) => `${item.env}:${item.region}`);
    void queryClient.prefetchQuery([Queries.SUMMARY, envRegionList], () =>
      fetchJobsSummary(REGION_ENVS),
    );
    return {};
  },
};
