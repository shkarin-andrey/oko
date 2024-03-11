import { FC, useMemo } from 'react';

import { IButton } from './Button.interface';

const Button: FC<IButton> = ({ children, size = 'm', className, ...props }) => {
  const classNameSize = useMemo(() => {
    switch (size) {
      case 'xl':
        return 'px-6 py-4 text-base';

      case 'l':
        return 'px-4 py-3 text-base';

      case 'm':
        return 'px-4 py-2 text-sm';

      case 's':
        return 'px-2 py-1 text-xs';
    }
  }, [size]);

  return (
    <button
      className={`flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed ${classNameSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
