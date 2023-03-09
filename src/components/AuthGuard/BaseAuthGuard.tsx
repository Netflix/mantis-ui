import { Navigate, useMatches } from 'react-router-dom';

import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useAuth } from '@/hooks/useAuth';

function AuthGuard({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  if (!user?.email) {
    const params = new URLSearchParams({ redirect: match.pathname });
    const ROOT = '/';
    return (
      <Navigate
        to={{
          pathname: AppRoutePaths.LOGIN,
          search: match.pathname !== ROOT ? `?${params.toString()}` : '',
        }}
        replace={true}
      />
    );
  }

  return children;
}

export default AuthGuard;
