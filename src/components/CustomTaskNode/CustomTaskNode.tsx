import { FC, memo, useState } from 'react';
import { Handle, NodeToolbar, Position } from 'reactflow';

import noAvatar from '/no-avatar.svg';
import bugImg from '/taskType/bug.svg';
import featImg from '/taskType/feat.svg';
import storyImg from '/taskType/story.svg';

import { ICustomTaskNode } from './CustomTaskNode.interface';

const CustomTaskNode: FC<ICustomTaskNode> = ({ data }) => {
  const typeTask = data.is_bug ? bugImg : featImg;
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const description = data.description?.[0].trim();

  return (
    <div
      className={`p-3 shadow-md rounded-md w-[260px] relative ${
        isOpenTooltip ? 'bg-blue-100' : 'bg-white'
      }`}
      aria-hidden
      onMouseEnter={() => setIsOpenTooltip(true)}
      onMouseLeave={() => setIsOpenTooltip(false)}
    >
      <NodeToolbar
        isVisible={isOpenTooltip}
        className='bg-gray-200 p-2 rounded-md max-w-[300px] text-xs break-words'
        position={Position.Top}
      >
        <strong>Название:</strong>
        <p>{data.summary}</p>
        {!!description && (
          <>
            <br />
            <strong>Описание:</strong>
            <div className='whitespace-pre-line'>{description}</div>
          </>
        )}
      </NodeToolbar>

      <div className='flex flex-col gap-2'>
        <div className='font-medium text-base line-clamp-3'>{data.summary}</div>
        <div className='flex gap-2'>
          <img
            src={data.is_story ? storyImg : typeTask}
            className='w-4 h-4'
            alt={data.key}
          />
          <div className='text-sm'>{data.key}</div>
        </div>
        <div className='flex gap-1 items-center'>
          <div className='w-4 h-4 rounded-md overflow-hidden'>
            <img
              src={data.avatar[0] ?? noAvatar}
              alt={data.assignee}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='text-xs'>{data.assignee}</div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <div className='bg-[#1998FF1A] text-[#1998FF] px-[6px] rounded-sm text-sm w-fit'>
              {data.increment_points}
            </div>
            <div className='bg-[#4453711A] text-[#445371] px-[6px] rounded-sm text-sm w-fit'>
              {data.inherited_increment_points}
            </div>
            {data?.tshirt && (
              <div className='bg-[#8fff7330] text-[#66c94d] px-[6px] rounded-sm text-sm w-fit'>
                {data.tshirt}
              </div>
            )}
          </div>
          <div
            className='text-xs px-[6px] py-0.5 rounded-sm w-fit'
            style={{
              background: `${data.color}30`,
              color: data.color,
            }}
          >
            {data.status[0]}
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
