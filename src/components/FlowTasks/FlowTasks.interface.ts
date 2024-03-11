import { RootTask } from '../../interfaces/Hierarchy.interface';

export interface IFlowTasks {
  children?: React.ReactNode;
  tasks?: Record<string, RootTask>;
}
