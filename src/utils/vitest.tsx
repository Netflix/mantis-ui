import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { vi } from 'vitest';

export const renderWithQueryClient = (ui: ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

export function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
  });
}
