import { FC, useEffect, useState } from 'react';
import { ParamParseKey, Params, useParams } from 'react-router-dom';
import { Panel, ReactFlowProvider } from 'reactflow';

import Button from '../components/Button';
import DrawerInfo from '../components/DrawerInfo';
import FlowTasks from '../components/FlowTasks';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import Layout from '../layout';
import { useGetHierarchyQuery } from '../redux/api/apiHierarchySlice';
import { useGetSprintsQuery } from '../redux/api/apiSprintsSlice';
import { selectSprint } from '../redux/state/sprintSlice';
import { Paths } from '../routers/routers.config';

const ProjectPage: FC = () => {
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.sprint.select);

  const { id } = useParams() as Params<ParamParseKey<typeof Paths.projectsDetail>>;
  const sprintId = id ? +id : undefined;

  const {
    data: sprints,
    isLoading: isLoadingSprints,
    isFetching: isFetchingSprints,
  } = useGetSprintsQuery(sprintId || 0, {
    skip: !sprintId,
  });
  const {
    data: hierarchy,
    isLoading: isHierarchyLoading,
    isFetching: isFetchingLoading,
  } = useGetHierarchyQuery(
    {
      board_id: sprintId || 0,
      sprint_id: select || 0,
    },
    {
      skip: !sprintId || !select,
    },
  );

  const [isOpenInformations, setIsOpenInformations] = useState(false);

  useEffect(() => {
    if (!sprints || sprints.length === 0) {
      dispatch(selectSprint(undefined));
      return;
    }
    dispatch(selectSprint(sprints[0].value));
  }, [sprints]);

  const handleOpenInformations = () => {
    setIsOpenInformations((prev) => !prev);
  };

  const handleChangeSprint = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(selectSprint(+e.currentTarget.value));
  };

  const isLoading =
    isLoadingSprints || isHierarchyLoading || isFetchingSprints || isFetchingLoading;

  return (
    <Layout isLoading={isLoading}>
      <ReactFlowProvider>
        <FlowTasks tasks={sprints?.length ? hierarchy?.tasks : undefined}>
          <Panel position='top-left' className='flex flex-col gap-2'>
            <Button
              disabled={!sprints?.length || isHierarchyLoading}
              onClick={handleOpenInformations}
              className='w-fit hidden sm:flex'
            >
              Информация
            </Button>
            {sprints && sprints.length > 0 ? (
              <select
                onChange={handleChangeSprint}
                value={select}
                className='py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
              >
                {sprints.map((item) => (
                  <option key={item.label} value={item.value.toString()}>
                    {item.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className='text-red-500'>Нет активных спринтов</div>
            )}
          </Panel>
        </FlowTasks>
      </ReactFlowProvider>
      {hierarchy?.burndown && hierarchy?.statistics && (
        <DrawerInfo
          burndown={hierarchy.burndown.data}
          isOpenInformations={isOpenInformations}
          statistics={hierarchy.statistics}
        />
      )}
    </Layout>
  );
};

export default ProjectPage;
