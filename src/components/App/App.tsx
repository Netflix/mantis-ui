import AppProvider from '@/providers/app';
import { loadComponentModule } from '@/utils/module-loader';
import type { IRouter } from '@/components/Router/Router';
import { lazy } from 'react';

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
