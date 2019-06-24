import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-location';

import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import RouteBreadcrumbs from '@/components/RouteBreadcrumbs/RouteBreadcrumbs';
import TopNav from '@/components/TopNav/TopNav';
import { lazy } from 'react';
import { loadComponentModule } from '@/utils/module-loader';
import { IAuthGuard } from '@/components/AuthGuard/AuthGuard';

const AuthGuard = lazy(() => {
  return loadComponentModule<IAuthGuard>('AuthGuard', 'AuthGuard');
});

function Layout() {
  return (
    <AuthGuard>
      <TopNav />
      <div className="mt-2 mx-auto">
        <RouteBreadcrumbs />
      </div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </AuthGuard>
  );
}

export default Layout;
