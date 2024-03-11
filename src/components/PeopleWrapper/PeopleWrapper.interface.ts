import { ReactNode } from 'react';

export interface IPeopleWrapper {
  title: string;
  children: ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}
