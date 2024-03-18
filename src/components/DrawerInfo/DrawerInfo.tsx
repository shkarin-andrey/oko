import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { FC, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import CircleProgress from '../CircleProgress';
import PeopleList from '../PeopleList';
import PeopleWrapper from '../PeopleWrapper';
import { IDrowerInfo } from './DrowerInfo.interface';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const DrawerInfo: FC<IDrowerInfo> = ({ statistics, isOpenInformations, burndown }) => {
  const {
    authors,
    reviewers,
    testers,
    assignees,
    total_sprint_days,
    days_passed,
    sprint_completion_percentage,
    tehdolg_percentage,
    total_bugs,
  } = statistics;

  const authorNames = Object.keys(authors);
  const reviewerNames = Object.keys(reviewers);
  const testerNames = Object.keys(testers);
  const assigneeNames = Object.keys(assignees);

  const classNameInformations = isOpenInformations
    ? 'sm:translate-x-0'
    : 'sm:translate-x-full';

  const burndownData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    burndown.forEach((item) => {
      const date = item.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2.$3');

      labels.push(date);
      data.push(item.remaining_tasks);
    });

    return {
      labels,
      datasets: [
        {
          data,
          label: 'Закрытые таски',
          fill: true,
          borderColor: '#D91528',
          stepped: true,
        },
      ],
    };
  }, [burndown]);

  const circleColorProgress = useMemo(() => {
    if (sprint_completion_percentage < 45) {
      return '#D91528';
    }

    if (sprint_completion_percentage >= 45) {
      return '#F29100';
    }

    return '#019F3C';
  }, [sprint_completion_percentage]);

  return (
    <div
      className={`sm:max-w-[390px] transition-transform bg-white sm:px-3 sm:py-3 flex flex-col gap-5 sm:absolute right-0 top-0 h-full sm:h-[calc(100vh-73px)] py-5 sm:overflow-y-auto ${classNameInformations}`}
    >
      <PeopleWrapper title='Прогресс закрытия тасок'>
        <Line data={burndownData} />
      </PeopleWrapper>
      <PeopleWrapper title='Статистика' className='sm:!flex-row items-center'>
        <CircleProgress
          progress={sprint_completion_percentage}
          indicatorColor={circleColorProgress}
          label='Выполнение спринта'
        />
        <div className='w-full h-0.5 sm:h-full sm:w-0.5 bg-[#44537126]' />
        <div className='flex flex-col gap-2'>
          <div>
            <div className='font-normal text-sm'>Прошло:</div>
            <div className='font-semibold text-base'>
              {days_passed} из {total_sprint_days} дней
            </div>
          </div>
          <div>
            <div className='font-normal text-sm'>Технический долг:</div>
            <div className='font-semibold text-base'>{tehdolg_percentage}%</div>
          </div>
          <div>
            <div className='font-normal text-sm'>Количество багов:</div>
            <div className='font-semibold text-base'>{total_bugs}</div>
          </div>
        </div>
      </PeopleWrapper>
      <PeopleWrapper title='Авторы'>
        {authorNames.map((item) => (
          <PeopleList
            key={item}
            avatar={authors?.[item].avatar}
            doneTasks={authors?.[item].done_tasks}
            title={item}
          />
        ))}
      </PeopleWrapper>
      <PeopleWrapper title='Ревьюеры'>
        {reviewerNames.map((item) => (
          <PeopleList
            key={item}
            avatar={reviewers?.[item].avatar}
            doneTasks={reviewers?.[item].done_tasks}
            title={item}
          />
        ))}
      </PeopleWrapper>
      <PeopleWrapper title='Тестировщики'>
        {testerNames.map((item) => (
          <PeopleList
            key={item}
            avatar={testers?.[item].avatar}
            doneTasks={testers?.[item].done_tasks}
            title={item}
          />
        ))}
      </PeopleWrapper>
      <PeopleWrapper title='Исполнители и количество задач'>
        {assigneeNames.map((item) => (
          <PeopleList
            key={item}
            avatar={assignees?.[item].avatar}
            doneTasks={assignees?.[item].done_tasks}
            title={item}
          />
        ))}
      </PeopleWrapper>
    </div>
  );
};

export default DrawerInfo;
