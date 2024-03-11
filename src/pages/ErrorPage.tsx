import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Layout from '../layout';

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center text-lg px-4 h-full'>
        <h1>Ой-ой!</h1>
        <div className='text-9xl font-bold'>404</div>
        <p className='text-center'>Извините, похоже такой страницы не существует.</p>

        <Button onClick={handleClick} className='mt-5'>
          Вернуться на главную
        </Button>
      </div>
    </Layout>
  );
};

export default ErrorPage;
