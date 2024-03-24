import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import Button from '../components/Button';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { auth } from '../redux/state/authSlice';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .test('login', 'Логин введен неверно', function (item) {
      if (item !== 'monowork') return false;
      return true;
    })
    .required('Заполните поле с логином'),
  password: Yup.string()
    .test('password', 'Пароль введен неверно', function (item) {
      if (item !== 'monowork') return false;
      return true;
    })
    .required('Заполните поле с паролем'),
});

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: () => {
      dispatch(auth(true));
      localStorage.setItem('auth', 'true');
    },
  });

  const isError = (name: keyof typeof formik.initialValues) => {
    return formik.errors[name];
  };

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-[320px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Логин
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isError('username') ? 'border-red-500' : ''
            }`}
            id='username'
            type='text'
            placeholder='login'
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {isError('username') && (
            <div className='text-red-500 text-xs'>{formik.errors.username}</div>
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Пароль
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              isError('password') ? 'border-red-500' : ''
            }`}
            id='password'
            type='password'
            placeholder='******************'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {isError('password') && (
            <div className='text-red-500 text-xs'>{formik.errors.password}</div>
          )}
        </div>
        <Button type='submit'>Войти</Button>
      </form>
    </div>
  );
};

export default LoginPage;
