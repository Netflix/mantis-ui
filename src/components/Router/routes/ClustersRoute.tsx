import { Title } from '@mantine/core';
import { lazy } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { Queries, queryClient } from '@/lib/react-query';
import { REGION_ENVS } from '@/services/BaseService';
import { fetchJobClusterByName, fetchJobClusters } from '@/services/JobClusterService';

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
      breadcrumb: ({ clusterId }: { clusterId: string }) => (
        <Title c="blue" order={3}>
          {clusterId}
        </Title>
      ),
    },
    meta: {
      breadcrumb: ({ clusterId }: { clusterId: string }) => clusterId,
    },
    element: <ClusterDetail />,
    loader(args: LoaderFunctionArgs) {
      const { clusterId } = args as unknown as { clusterId: string };
      void queryClient.prefetchQuery([Queries.CLUSTER_DETAILS, clusterId], () =>
        fetchJobClusterByName(REGION_ENVS, clusterId),
      );
      return {};
    },
  },
];
