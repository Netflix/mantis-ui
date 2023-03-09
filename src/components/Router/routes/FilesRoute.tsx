import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { Queries, queryClient } from '@/lib/react-query';
import { fetchArtifacts } from '@/services/ArtifactService';
import { ENVS } from '@/services/BaseService';

const Files = lazy(() => import('@/components/Files/Files'));
const FilesList = lazy(() => import('@/components/Files/FilesList'));
const FilesUpload = lazy(() => import('@/components/Files/FilesUpload'));

export default [
  {
    path: AppRoutePaths.FILES,
    handle: {
      breadcrumb: 'Files',
    },
    element: <Files />,
    children: [
      { index: true, element: <Navigate to={AppRoutePaths.FILES_UPLOAD} /> },
      {
        path: AppRoutePaths.FILES_UPLOAD,
        element: <FilesUpload />,
      },
      {
        path: AppRoutePaths.FILES_LIST,
        element: <FilesList />,
        loader() {
          void queryClient.prefetchQuery(Queries.ARTIFACTS, () => fetchArtifacts(ENVS));
          return {};
        },
      },
    ],
  },
];
