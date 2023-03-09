import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from '@/components/Router/routes/index';

function AppRouter() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default AppRouter;
