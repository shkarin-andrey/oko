import { NodeProps } from 'reactflow';

import { NodeData } from '../../interfaces/ReactFlow.interface';

export interface ICustomTaskNode extends NodeProps {
  data: Omit<NodeData, 'children'>;
}
