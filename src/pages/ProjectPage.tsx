import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { ParamParseKey, Params, useParams } from 'react-router-dom';
import { Panel, ReactFlowProvider } from 'reactflow';

import Button from '../components/Button';
import DrawerInfo from '../components/DrawerInfo';
import FlowTasks from '../components/FlowTasks';
import { JiraSprintState } from '../interfaces/JiraSprint.interface';
import { Paths } from '../routers/routers.config';
import { getHierarchy } from '../services/getHierarchy';
import { getSprints } from '../services/getSprints';
import { generateEdgesTasks } from '../utils/generateEdgesTasks';
import { generateNodesTasks } from '../utils/generateNodesTasks';
import { getLayoutedElements } from '../utils/getLayoutedElements';

const hierarchyQuery = (boardId?: number, sprintId?: number) =>
  queryOptions({
    queryKey: ['hierarchy', boardId, sprintId],
    enabled: !!boardId && !!sprintId,
    queryFn: async () => {
      const hierarchy = await getHierarchy({
        board_id: boardId || 0,
        sprint_id: sprintId || 0,
      });

      const initialNodes = generateNodesTasks(hierarchy.tasks);
      const initialEdges = generateEdgesTasks(hierarchy.tasks);

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
      );

      return { hierarchy, layoutedNodes, layoutedEdges };
    },
  });

const sprintsQuery = (id?: number) =>
  queryOptions({
    queryKey: ['sprints', id],
    enabled: !!id,
    queryFn: async () => {
      const data = await getSprints(id || 0);
      return data
        .filter((item) => item.state === JiraSprintState.Active)
        .map((item) => ({ value: item.id, label: item.name }));
    },
  });

const ProjectPage: FC = () => {
  const { id } = useParams() as Params<ParamParseKey<typeof Paths.projectsDetail>>;
  const sprintId = id ? +id : undefined;

  const { data: sprints } = useSuspenseQuery(sprintsQuery(sprintId));
  const [selectSprint, setSelectSprint] = useState<number | undefined>(undefined);
  const { data, isLoading: isHierarchyLoading } = useQuery(
    hierarchyQuery(sprintId, selectSprint),
  );

  const [isOpenInformations, setIsOpenInformations] = useState(false);

  useEffect(() => {
    if (!sprints.length) {
      setSelectSprint(undefined);
    } else {
      setSelectSprint(sprints[0].value);
    }
  }, [sprints]);

  const handleOpenInformations = () => {
    setIsOpenInformations((prev) => !prev);
  };

  const handleChangeSprint = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectSprint(+e.currentTarget.value);
  };

  return (
    <>
      <ReactFlowProvider>
        <FlowTasks
          layoutedEdges={sprints.length && data?.layoutedEdges ? data?.layoutedEdges : []}
          layoutedNodes={sprints.length && data?.layoutedNodes ? data?.layoutedNodes : []}
        >
          <Panel position='top-left' className='flex flex-col gap-2'>
            <Button
              disabled={!sprints.length || isHierarchyLoading}
              onClick={handleOpenInformations}
              className='w-fit'
            >
              Информация
            </Button>
            {sprints?.length > 0 ? (
              <select
                onChange={handleChangeSprint}
                value={selectSprint}
                className='py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
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
            {isHierarchyLoading && (
              <div className='text-blue-600'>Загрузка информации...</div>
            )}
          </Panel>
        </FlowTasks>
      </ReactFlowProvider>
      {data?.hierarchy.burndown && data?.hierarchy?.statistics && (
        <DrawerInfo
          isLoading={isHierarchyLoading}
          burndown={data?.hierarchy.burndown.data}
          isOpenInformations={isOpenInformations}
          statistics={data?.hierarchy.statistics}
        />
      )}
    </>
  );
};

export default ProjectPage;
