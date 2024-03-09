import { FC } from 'react';
import { ErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import Button from '../components/Button';

const ErrorPage: FC = () => {
  const error = useRouteError() as ErrorResponse;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen text-lg px-4'>
      <h1>Ой-ой!</h1>
      <div className='text-9xl font-bold'>{error.status}</div>
      <p className='text-center'>Извините, произошла непредвиденная ошибка.</p>
      <div className='text-red-500 text-center'>{error.statusText || error.message}</div>
      <Button onClick={handleClick} className='mt-5'>
        Вернуться на главную
      </Button>
    </div>
  );
};

export default ErrorPage;
