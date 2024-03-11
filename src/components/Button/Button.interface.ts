import { ReactNode } from 'react';

type Size = 's' | 'm' | 'l' | 'xl';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Size;
}
