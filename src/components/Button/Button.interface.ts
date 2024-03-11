import { ReactNode } from 'react';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
