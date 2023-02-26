import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import '@/index.css';
import reportWebVitals from '@/reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Suspense
      fallback={<h1 className="flex flex-1 justify-center items-center">Bootstrapping App...</h1>}
    >
      <App />
    </Suspense>
  </StrictMode>,
);

// Function is a no-op unless an arg is provided such as console.info
reportWebVitals();
