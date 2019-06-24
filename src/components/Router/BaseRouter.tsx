import { AppRoutePaths } from '@/router/routes';
import { Navigate, ReactLocation, Route, Router } from 'react-location';
import { LocationGenerics } from '@/components/Router/Router';

// Route Components
import ClustersRoute from '@/components/Router/routes/ClustersRoute';
import FilesRoute from '@/components/Router/routes/FilesRoute';
import Layout from '@/components/Layout/Layout';
import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';
import JobsRoute from '@/components/Router/routes/JobsRoute';
import SummaryRoute from '@/components/Router/routes/SummaryRoute';

function AppRouter() {
  const location = new ReactLocation<LocationGenerics>();
  const routes: Route<LocationGenerics>[] = [
    {
      path: AppRoutePaths.LOGIN,
      import: () =>
        import('@/components/Router/routes/LoginRoute').then((module) => module.default),
    },
    {
      path: '/',
      id: 'root',
      element: <Layout />,
      children: [
        { path: '/', id: 'redirect-jobs', element: <Navigate to={AppRoutePaths.JOBS} /> },
        {
          path: AppRoutePaths.JOBS,
          ...JobsRoute,
        },
        {
          path: AppRoutePaths.CLUSTERS,
          ...ClustersRoute,
        },
        {
          path: AppRoutePaths.FILES,
          ...FilesRoute,
        },
        {
          path: AppRoutePaths.SUMMARY,
          ...SummaryRoute,
        },
        {
          element: () =>
            import('@/components/NotFound/NotFound').then((module) => <module.default />),
        },
      ],
    },
  ];

  return (
    <Router
      routes={routes}
      location={location}
      defaultPendingMs={300}
      defaultPendingMinMs={500}
      defaultPendingElement={<LoadingFallback />}
      defaultLinkPreloadMaxAge={5000}
    />
  );
}

export default AppRouter;
