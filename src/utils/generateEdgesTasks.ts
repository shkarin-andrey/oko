import { Edge, MarkerType } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import { Hierarchy, RootTask } from '../interfaces/Hierarchy.interface';

export const generateEdgesTasks = (
  tasks: Hierarchy['tasks'] | RootTask[],
  prevTask?: RootTask,
): Edge[] => {
  const arr = Array.isArray(tasks) ? tasks : Object.keys(tasks).map((key) => tasks[key]);

  const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#FF0072',
  };

  return arr.reduce<Edge[]>((acc, task, index) => {
    const edge: Edge = {
      id: uuidv4(),
      source: prevTask?.key ? prevTask.key : task.key,
      target: task.key,
      type: 'smoothstep',
      markerEnd,
    };

    if (task.children.length) {
      acc.push(edge, ...generateEdgesTasks(task.children, arr[index]));
    } else {
      acc.push(edge);
    }

    return acc;
  }, []);
};
