import { REGION_ENVS } from '@/services/BaseService';
import { Queries, queryClient } from '@/lib/react-query';
import { fetchJobsSummary } from '@/services/JobService';
import { Suspense } from 'react';
import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';

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
