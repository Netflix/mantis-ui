import type { DefaultOptions } from 'react-query';
import { QueryClient } from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export const Queries = {
  AUTH: 'auth',
  JOBS: 'jobs',
  CLUSTERS: 'clusters',
  CLUSTER_DETAILS: 'clusterDetails',
  JOBS_ON_CLUSTER: 'jobsOnCluster',
  ARTIFACTS: 'artifacts',
  SUMMARY: 'summary',
};
