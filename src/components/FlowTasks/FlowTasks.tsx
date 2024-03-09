// eslint-disable-next-line simple-import-sort/imports
import { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import CustomTaskNode from '../CustomTaskNode';

interface IFlowTasks {
  children?: React.ReactNode;
  layoutedNodes: Node[];
  layoutedEdges: Edge[];
}

const nodeTypes: NodeTypes = { task: CustomTaskNode };

const FlowTasks: FC<IFlowTasks> = ({ layoutedEdges, layoutedNodes, children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges || []);

  useEffect(() => {
    if (!layoutedEdges.length && !layoutedNodes.length) {
      setNodes([]);
      setEdges([]);
      return;
    }
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedEdges, layoutedNodes, setNodes, setEdges]);

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
