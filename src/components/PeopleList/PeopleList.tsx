import { FC } from 'react';

interface IPeopleList {
  avatar: string;
  title: string;
  doneTasks: number;
}

const PeopleList: FC<IPeopleList> = ({ avatar, title, doneTasks }) => {
  return (
    <div className='flex justify-between items-center rounded-md'>
      <div className='flex gap-4'>
        <img src={avatar} alt={title} className='w-10 h-10 rounded-md' />
        <div className='font-semibold text-sm'>{title}</div>
      </div>
      <div className='w-10 h-10 rounded-full bg-white flex justify-center items-center'>
        {doneTasks}
      </div>
    </div>
  );
};

export default PeopleList;
