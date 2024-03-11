import { FC } from 'react';
import { ParamParseKey, Params, useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetHierarchyQuery } from '../../redux/api/apiHierarchySlice';
import { Paths } from '../../routers/routers.config';
import Button from '../Button';
import Hamburger from '../Hamburger';
import Logo from '../Logo';
import { IHeader } from './Header.interface';

const Header: FC<IHeader> = ({ isOpenMenu, onClick }) => {
  const { id } = useParams() as Params<ParamParseKey<typeof Paths.projectsDetail>>;
  const sprintId = id ? +id : undefined;

  const select = useAppSelector((state) => state.sprint.select);
  const { isFetching, isLoading, refetch } = useGetHierarchyQuery(
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

  return (
    <header className='w-full justify-between py-3 px-6 flex items-center border-b border-[#44537126]'>
      <Logo />
      {isProjects && (
        <Button disabled={isFetching || isLoading} onClick={handleClick}>
          Обновить
        </Button>
      )}
      <Hamburger isOpenMenu={isOpenMenu} onClick={onClick} />
    </header>
  );
};

export default Header;
