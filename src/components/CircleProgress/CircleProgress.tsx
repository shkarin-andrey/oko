import { FC } from 'react';

import { ICircleProgress } from './CircleProgress.interface';

const CircleProgress: FC<ICircleProgress> = ({
  progress,
  size = 150,
  trackWidth = 13,
  trackColor = `#ddd`,
  indicatorWidth = 15,
  indicatorColor = `#07c`,
  indicatorCap = `round`,
  label = `Loading...`,
  labelColor = `#333`,
  spinnerMode = false,
  spinnerSpeed = 1,
}) => {
  const center = size / 2,
    radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  const hideLabel = size < 100 || !label.length || spinnerMode ? true : false;

  return (
    <>
      <div className='relative' style={{ width: size, height: size }}>
        <svg className='-rotate-90' style={{ width: size, height: size }}>
          <circle
            cx={center}
            cy={center}
            fill='transparent'
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={spinnerMode ? 'svg-pi-indicator--spinner' : ''}
            style={{ animationDuration: (spinnerSpeed * 1000).toString() }}
            cx={center}
            cy={center}
            fill='transparent'
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        {!hideLabel && (
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col'
            style={{ color: labelColor }}
          >
            {!spinnerMode && (
              <span className='text-lg font-semibold'>
                {`${progress > 100 ? 100 : progress}%`}
              </span>
            )}
            <span className='text-xs font-normal'>{label}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CircleProgress;
