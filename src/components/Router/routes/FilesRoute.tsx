import { AppRoutePaths } from '@/router/routes';
import { fetchArtifacts } from '@/services/ArtifactService';
import { Suspense } from 'react';
import LoadingFallback from '@/components/LoadingFallback/LoadingFallback';
import { Navigate } from 'react-location';
import { ENVS } from '@/services/BaseService';
import { Queries, queryClient } from '@/lib/react-query';

export default {
  element: () =>
    import('@/components/Files/Files').then((module) => (
      <>
        <Suspense fallback={<LoadingFallback />}>
          <module.default />
        </Suspense>
      </>
    )),
  children: [
    {
      path: '/',
      element: <Navigate to={AppRoutePaths.FILES_UPLOAD} />,
    },
    {
      path: AppRoutePaths.FILES_UPLOAD,
      element: () =>
        import('@/components/Upload/Upload').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
    },
    {
      path: AppRoutePaths.FILES_LIST,
      element: () =>
        import('@/components/FilesList/FilesList').then((module) => (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <module.default />
            </Suspense>
          </>
        )),
      loader() {
        void queryClient.prefetchQuery(Queries.ARTIFACTS, () => fetchArtifacts(ENVS));
        return {};
      },
    },
  ],
};
