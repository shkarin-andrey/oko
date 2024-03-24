import { FC, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { auth } from './redux/state/authSlice';
import { authRouts, routs } from './routers';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const lsAuth = localStorage.getItem('auth');

    if (lsAuth === 'true') {
      dispatch(auth(true));
    }
  }, []);

  const routsList = useMemo(() => {
    if (isAuth) {
      return routs;
    }

    return authRouts;
  }, [isAuth]);

  return (
    <Routes>
      {routsList.map(({ path, component }) => (
        <Route key={path} path={path} Component={component} />
      ))}
    </Routes>
  );
};

export default App;
