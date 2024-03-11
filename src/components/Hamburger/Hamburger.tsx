import { FC } from 'react';

import { IHamburger } from './Hamburger.interface';

const Hamburger: FC<IHamburger> = ({ isOpenMenu, onClick }) => {
  const classNameIsOpenMenu = isOpenMenu
    ? 'invisible after:visible before:visible after:-translate-y-0.5 before:translate-y-0 before:rotate-45 after:-rotate-45'
    : 'visible after:-translate-y-2 before:translate-y-1.5 before:rotate-0 after:-rotate-0';

  return (
    <div
      onClick={onClick}
      aria-hidden
      className='sm:hidden w-6 flex flex-col justify-center h-6 relative cursor-pointer'
    >
      <div
        className={`rounded-md transition-all after:transition-all before:transition-all bg-gray-500 w-full h-0.5 before:content-[''] before:h-0.5 before:w-full before:bg-gray-500 before:block before:translate-y-1 after:content-[''] after:block after:h-0.5 after:w-full after:bg-gray-500 after:-translate-y-1 after:rounded-md before:rounded-md ${classNameIsOpenMenu}`}
      />
    </div>
  );
};

export default Hamburger;
