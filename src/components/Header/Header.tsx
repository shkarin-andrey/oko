import { FC } from 'react';
import { ParamParseKey, Params, useLocation, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetHierarchyQuery } from '../../redux/api/apiHierarchySlice';
import { setOpenInformations } from '../../redux/state/sprintSlice';
import { Paths } from '../../routers/routers.config';
import Button from '../Button';
import Hamburger from '../Hamburger';
import Logo from '../Logo';
import { IHeader } from './Header.interface';

const Header: FC<IHeader> = ({ isOpenMenu, onClick }) => {
  const { id } = useParams() as Params<ParamParseKey<typeof Paths.projectsDetail>>;
  const sprintId = id ? +id : undefined;

  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.sprint.select);
  const isOpenInformations = useAppSelector((state) => state.sprint.isOpenInformations);

  const { data, isFetching, isLoading, refetch } = useGetHierarchyQuery(
    {
      board_id: sprintId || 0,
      sprint_id: select || 0,
    },
    {
      skip: !sprintId || !select,
    },
  );

  const location = useLocation();

  const rx = /projects\/\d/;
  const isProjects = rx.test(location.pathname);

  const handleClick = () => {
    refetch();
  };

  const handleOpenInformations = () => {
    dispatch(setOpenInformations(!isOpenInformations));
  };

  return (
    <header className='w-full h-[72px] justify-between py-3 px-6 flex items-center border-b border-[#44537126]'>
      <Logo />
      {isProjects && (
        <div className='flex items-center gap-3'>
          <Button
            disabled={isFetching || isLoading || !data || !select}
            onClick={handleOpenInformations}
            className='w-fit hidden sm:flex'
          >
            Информация
          </Button>
          <Button disabled={isFetching || isLoading} onClick={handleClick}>
            Обновить
          </Button>
        </div>
      )}
      <Hamburger isOpenMenu={isOpenMenu} onClick={onClick} />
    </header>
  );
};

export default Header;
