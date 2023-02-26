import { lazy } from 'react';

import type { IRouter } from '@/components/Router/Router';
import AppProvider from '@/providers/app';
import { loadComponentModule } from '@/utils/module-loader';

const Router = lazy(() => {
  return loadComponentModule<IRouter>('Router', 'Router');
});

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
