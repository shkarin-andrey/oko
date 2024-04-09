import { Node } from 'reactflow';

import { Hierarchy, RootTask } from '../interfaces/Hierarchy.interface';
import { NodeData } from '../interfaces/ReactFlow.interface';

const position = { x: 0, y: 0 };

export const generateNodesTasks = (
  tasks: Hierarchy['tasks'] | RootTask[],
  prevTask?: RootTask,
): Node[] => {
  const arr = Array.isArray(tasks) ? tasks : Object.keys(tasks).map((key) => tasks[key]);

  return arr.reduce<Node[]>((acc, task) => {
    const { children, ...data } = task;

    const node: Node<Omit<NodeData, 'children'>> = {
      id: task.key,
      data: {
        ...data,
        isLeft: prevTask ? true : false,
        isRight: false,
      },
      type: 'task',
      position,
    };

    if (task.children.length) {
      acc.push(
        { ...node, data: { ...node.data, isRight: true } },
        ...generateNodesTasks(task.children, task),
      );
    } else {
      acc.push(node);
    }

    return acc;
  }, []);
};
