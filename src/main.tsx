import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { setupMirage } from '@/mirage/index';

import App from '@/components/App/App';
import '@/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

// Setup MirageJS to mock APIs
setupMirage();

root.render(
  <StrictMode>
    <Suspense
      fallback={<h1 className="flex flex-1 justify-center items-center">Bootstrapping App...</h1>}
    >
      <App />
    </Suspense>
  </StrictMode>,
);
