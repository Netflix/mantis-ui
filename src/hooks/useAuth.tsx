import { createContext, useContext } from 'react';

import type { User } from '@/types/user';

export type AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (...args: any[]) => void;
  logout: (callback?: VoidFunction) => void;
  user: User | null;
};

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
