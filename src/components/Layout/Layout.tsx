import { AppShell, Header } from '@mantine/core';
import { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-location';
import { QueryErrorResetBoundary } from 'react-query';

import { IAuthGuard } from '@/components/AuthGuard/AuthGuard';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import RouteBreadcrumbs from '@/components/RouteBreadcrumbs/RouteBreadcrumbs';
import TopNav from '@/components/TopNav/TopNav';
import { loadComponentModule } from '@/utils/module-loader';

const AuthGuard = lazy(() => {
  return loadComponentModule<IAuthGuard>('AuthGuard', 'AuthGuard');
});

function Layout() {
  return (
    <AuthGuard>
      <AppShell
        padding="md"
        header={
          <Header height={45}>
            <TopNav />
          </Header>
        }
      >
        <div className="mx-auto">
          <RouteBreadcrumbs />
        </div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
              <Outlet />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </AppShell>
    </AuthGuard>
  );
}

export default Layout;
