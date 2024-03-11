import { FC } from 'react';

import { IButton } from './Button.interface';

const Button: FC<IButton> = ({ children, className, ...props }) => {
  return (
    <button
      className={`flex items-center gap-2 bg-blue-600 text-white px-4 py-3 font-semibold text-base rounded-lg ${className} disabled:bg-gray-200 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
