import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import LoadingFallback from '@/components/LoadingFallback';
import '@/index.css';
import { setupMirage } from '@/mirage/index';

const container = document.getElementById('root');
const root = createRoot(container!);

// Setup MirageJS to mock APIs
setupMirage();

root.render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>,
);
