import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';
import { lazy, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@/lib/react-query';
import type { IAuthProvider } from '@/providers/auth/AuthProvider';
import type { IInitProvider } from '@/providers/init/InitProvider';
import { loadProviderModule } from '@/utils/module-loader';

const InitProvider = lazy(() => {
  return loadProviderModule<IInitProvider>('init', 'InitProvider');
});

const AuthProvider = lazy(() => {
  return loadProviderModule<IAuthProvider>('auth', 'AuthProvider');
});

function AppProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              colorScheme,
              fontFamily: 'Roboto, sans-serif',
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Notifications />
            <InitProvider>
              <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
                <AuthProvider>{children}</AuthProvider>
              </ModalsProvider>
            </InitProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default AppProvider;
