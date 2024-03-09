import { FC } from 'react';

import Button from '../Button';
import Hamburger from '../Hamburger';
import Logo from '../Logo';

interface IHeader {
  isOpenMenu: boolean;
  onClick: () => void;
}

const Header: FC<IHeader> = ({ isOpenMenu, onClick }) => {
  return (
    <header className='w-full justify-between py-3 px-6 flex items-center border-b border-[#44537126]'>
      <Logo />
      <Button>Обновить</Button>
      <Hamburger isOpenMenu={isOpenMenu} onClick={onClick} />
    </header>
  );
};

export default Header;
