import { Suspense } from 'react';
import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';
import { REGION_ENVS } from '@/services/BaseService';
import { Queries, queryClient } from '@/lib/react-query';
import { fetchJobClusters } from '@/services/JobClusterService';

export default {
  meta: {
    breadcrumb: 'Clusters',
  },
  children: [
    {
      path: '/',
      element: () =>
        import('@/components/Clusters/Clusters').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
      loader() {
        void queryClient.prefetchQuery(Queries.CLUSTERS, () => fetchJobClusters(REGION_ENVS));
        return {};
      },
    },
    {
      path: `create`,
      meta: {
        breadcrumb: 'Create New Cluster',
      },
      element: () =>
        import('@/components/CreateCluster/CreateCluster').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
    },
    {
      path: `:clusterId`,
      meta: {
        breadcrumb: ({ clusterId }: { clusterId: string }) => clusterId,
      },
      element: () =>
        import('@/components/ClusterDetail/ClusterDetail').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
    },
  ],
};
