import { lazy } from 'react';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobClusters } from '@/services/JobClusterService';

const Clusters = lazy(() => import('@/components/Clusters/Clusters'));
const CreateCluster = lazy(() => import('@/components/Clusters/CreateCluster'));
const ClusterDetail = lazy(() => import('@/components/Clusters/ClusterDetail'));

export default [
  {
    path: AppRoutePaths.CLUSTERS,
    handle: {
      breadcrumb: 'Clusters',
    },
    element: <Clusters />,
    loader() {
      void queryClient.prefetchQuery(Queries.CLUSTERS, () => fetchJobClusters(REGION_ENVS));
      return {};
    },
  },
  {
    path: `${AppRoutePaths.CLUSTERS}/create`,
    meta: {
      breadcrumb: 'Create New Cluster',
    },
    element: <CreateCluster />,
  },
  {
    path: `${AppRoutePaths.CLUSTERS}/:clusterId`,
    handle: {
      breadcrumb: 'Cluster Details',
    },
    meta: {
      breadcrumb: ({ clusterId }: { clusterId: string }) => clusterId,
    },
    element: <ClusterDetail />,
  },
];
