import { FC } from 'react';
import { Link } from 'react-router-dom';

import LogoIcon from '/logo.svg';

const Logo: FC = () => {
  return (
    <Link to={'/'} className='flex items-center gap-2 text-sm font-normal'>
      <img src={LogoIcon} alt='OKO' />
      <span>OKO</span>
    </Link>
  );
};

export default Logo;
