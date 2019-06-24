import ReactDOM from 'react-dom';
import '@/index.less';
import App from '@/components/App/App';
import { setupApiClients } from '@/services/BaseService';
import { StrictMode, Suspense } from 'react';
import reportWebVitals from '@/reportWebVitals';

const mode = import.meta.env.MODE;
const { API_URLS, ENVS_MAP, ADMIN_GROUPS } = import.meta.globEager('/src/config/*.ts')[
  `/src/config/${mode}.ts`
] as {
  API_URLS: { [key: string]: { [key: string]: string } };
  ENVS_MAP: { [key: string]: string[] };
  ADMIN_GROUPS: string[];
};

void setupApiClients(API_URLS, ENVS_MAP, ADMIN_GROUPS).then(() => {
  ReactDOM.render(
    <StrictMode>
      <Suspense
        fallback={<h1 className="flex flex-1 justify-center items-center">Welcome to Mantis UI</h1>}
      >
        <App />
      </Suspense>
    </StrictMode>,
    document.getElementById('root'),
  );

  // Function is a no-op unless an arg is provided such as console.info
  reportWebVitals();
});
