import { FC, useState } from 'react';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import { useGetProjectsQuery } from '../redux/api/apiProjectsSlice';
import { ILoader } from './Loader.interface';

const Layout: FC<ILoader> = ({ children, isLoading = false }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClickHamburger = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const classNameMobileMenu = isOpenMenu ? 'translate-x-0' : '-translate-x-full';

  const { data: routing = [], isLoading: isLoadingRouting } = useGetProjectsQuery();

  return (
    <div className='h-screen overflow-hidden'>
      <Header isOpenMenu={isOpenMenu} onClick={handleClickHamburger} />
      <div className='relative h-[calc(100vh-73px)] flex w-full'>
        <aside
          className={`z-10 transition-transform duration-200 h-full lg:translate-x-0 overflow-y-auto min-w-[300px] border-r border-[#44537126] bg-[#F9FAFB] py-6 px-8 flex flex-col gap-[20px] absolute lg:static top-0 left-0 ${classNameMobileMenu}`}
        >
          <div className='text-[#858FA3]'>Проекты</div>
          {isLoadingRouting ? (
            <div className='h-full flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <Navigation routs={routing} />
          )}
        </aside>
        <main className='w-full p-6 overflow-auto sm:overflow-hidden'>
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
