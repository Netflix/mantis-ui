import { ReactNode, useState } from 'react';

import { AuthContext } from '@/hooks/useAuth';
import { AuthContextType } from '@/hooks/useAuth';
import { User } from '@/types/user';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user') ?? 'null') as User;
  } catch (e) {
    return null;
  }
}

export function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const login = (user: User, callback?: VoidFunction) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    callback?.();
  };

  const logout = (callback?: VoidFunction) => {
    setUser(null);
    localStorage.removeItem('user');
    callback?.();
  };

  return {
    user,
    login,
    logout,
  };
}

function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
