import type { ReactNode } from 'react';

export type IAuthGuard = ({ children }: { children: ReactNode }) => JSX.Element;
