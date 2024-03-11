import { FC, memo } from 'react';
import { Handle, Position } from 'reactflow';

import bugImg from '/taskType/bug.svg';
import featImg from '/taskType/feat.svg';

import { ICustomTaskNode } from './CustomTaskNode.interface';

const CustomTaskNode: FC<ICustomTaskNode> = ({ data }) => {
  const typeTask = data.is_bug ? bugImg : featImg;

  return (
    <div className='p-3 shadow-md rounded-md bg-white w-[260px] relative group'>
      <div className='hidden absolute top-0 left-1/2 -translate-x-1/2 w-full bg-gray-200 p-2 rounded-md group-hover:block'>
        {data.summary}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='font-medium text-base truncate'>{data.summary}</div>
        <div className='flex gap-2'>
          <img src={typeTask} className='w-4 h-4' alt={data.key} />
          <div className='text-sm'>{data.key}</div>
        </div>
        <div className='flex items-center gap-1'>
          <div className='bg-[#1998FF1A] text-[#1998FF] px-[6px] rounded-sm text-sm w-fit'>
            {data.increment_points}
          </div>
          <div className='bg-[#4453711A] text-[#445371] px-[6px] rounded-sm text-sm w-fit'>
            {data.inherited_increment_points}
          </div>
        </div>
      </div>
      {data.isLeft && (
        <Handle
          type='target'
          position={Position.Left}
          className='h-[6px] w-[6px] rounded-full border border-red-500 !bg-white'
        />
      )}

      {data.isRight && (
        <Handle
          type='source'
          position={Position.Right}
          className='h-[6px] w-[6px] rounded-full border border-red-500 !bg-white'
        />
      )}
    </div>
  );
};

export default memo(CustomTaskNode);
