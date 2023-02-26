import { createContext, useContext } from 'react';

import { User } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (...args: any[]) => void;
  logout: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {
    /* no-op */
  },
  logout: () => {
    /* no-op */
  },
});

export function useAuth() {
  return useContext(AuthContext);
}
