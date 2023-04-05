import { lazy } from 'react';
import type { Params } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import ClustersRoute from '@/components/Router/routes/ClustersRoute';
import FilesRoute from '@/components/Router/routes/FilesRoute';
import JobsRoute from '@/components/Router/routes/JobsRoute';
import SummaryRoute from '@/components/Router/routes/SummaryRoute';
import { AppRoutePaths } from '@/components/Router/routes/constants';

const Login = lazy(() => import('@/components/Login'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Layout = lazy(() => import('@/components/Layout'));

export type RouteHandle = {
  breadcrumb: string | ((params: Params) => string);
};

export const routes = [
  {
    path: AppRoutePaths.LOGIN,
    element: <Login />,
  },
  {
    path: '/',
    id: 'root',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={AppRoutePaths.JOBS} /> },
      ...JobsRoute,
      ...ClustersRoute,
      ...FilesRoute,
      ...SummaryRoute,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
