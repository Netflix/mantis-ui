import { queryClient } from '@/lib/react-query';
import { loadProviderModule } from '@/utils/module-loader';
import { lazy, ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import type { IAuthProvider } from '@/providers/auth/AuthProvider';

const AuthProvider = lazy(() => {
  return loadProviderModule<IAuthProvider>('auth', 'AuthProvider');
});

function AppProvider({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default AppProvider;
