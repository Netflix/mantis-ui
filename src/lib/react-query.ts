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
  JOB: 'job',
  CLUSTERS: 'clusters',
  CLUSTER_DETAILS: 'clusterDetails',
  ARTIFACTS: 'artifacts',
  SUMMARY: 'summary',
};
