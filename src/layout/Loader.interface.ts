import { ReactNode } from 'react';

export interface ILoader {
  children: ReactNode;
  isLoading?: boolean;
}
