import { Navigate, useMatches } from 'react-location';

import { useAuth } from '@/hooks/useAuth';
import { AppRoutePaths } from '@/router/routes';

function AuthGuard({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  if (!user?.email) {
    return <Navigate to={AppRoutePaths.LOGIN} search={{ redirect: match.pathname }} />;
  }

  return children;
}

export default AuthGuard;
