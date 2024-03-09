import { FC, ReactNode } from 'react';

interface IPeopleWrapper {
  title: string;
  children: ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const PeopleWrapper: FC<IPeopleWrapper> = ({ title, children, className }) => {
  return (
    <div className='flex flex-col px-6 py-5 gap-4 bg-[#F6F6F8] rounded-md'>
      <div className='font-extrabold text-lg'>{title}</div>
      <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
    </div>
  );
};

export default PeopleWrapper;
