import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import LoadingFallback from '@/components/LoadingFallback';
import '@/index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </StrictMode>,
  );
} else {
  throw new Error('Root element not found');
}
