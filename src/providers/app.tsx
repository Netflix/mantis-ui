import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ReactNode, lazy, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@/lib/react-query';
import type { IAuthProvider } from '@/providers/auth/AuthProvider';
import { loadProviderModule } from '@/utils/module-loader';

import { IInitProvider } from './init/InitProvider';

const InitProvider = lazy(() => {
  return loadProviderModule<IInitProvider>('init', 'InitProvider');
});

const AuthProvider = lazy(() => {
  return loadProviderModule<IAuthProvider>('auth', 'AuthProvider');
});

function AppProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
            <NotificationsProvider>
              <InitProvider>
                <AuthProvider>{children}</AuthProvider>
              </InitProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default AppProvider;
