import { DefaultOptions, QueryClient } from 'react-query';

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
  ARTIFACTS: 'artifacts',
  SUMMARY: 'summary',
};
