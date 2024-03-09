import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IRouts } from '../../interfaces/Routs.interface';

interface INavigation {
  routs: IRouts[];
}

const Navigation: FC<INavigation> = ({ routs }) => {
  return (
    <nav className='flex flex-col gap-2'>
      {routs.map((item) => (
        <NavLink
          key={item.to}
          to={`projects/${item.to}`}
          className={({ isActive }) =>
            `py-2 px-3 hover:text-[#0055FF] hover:bg-gray-100 cursor-pointer transition-all duration-200 ${
              isActive ? 'text-[#0055FF] bg-[#0055FF0D]' : 'text-[#445371]'
            }`
          }
        >
          {item.value}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
