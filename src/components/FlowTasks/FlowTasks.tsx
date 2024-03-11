// eslint-disable-next-line simple-import-sort/imports
import { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { generateEdgesTasks } from '../../utils/generateEdgesTasks';
import { generateNodesTasks } from '../../utils/generateNodesTasks';
import { getLayoutedElements } from '../../utils/getLayoutedElements';
import { nodeTypes } from './FlowTasks.config';
import { IFlowTasks } from './FlowTasks.interface';

const FlowTasks: FC<IFlowTasks> = ({ tasks, children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!tasks) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const initialNodes = generateNodesTasks(tasks);
    const initialEdges = generateEdgesTasks(tasks);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges,
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [tasks]);

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      ),
    [setEdges],
  );

  return (
    <ReactFlow
      nodesDraggable={false}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background className='bg-[#F6F6F8] rounded-md' />
      {children}
    </ReactFlow>
  );
};

export default FlowTasks;
