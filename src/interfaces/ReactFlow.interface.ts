import { RootTask } from './Hierarchy.interface';

export interface NodeData extends RootTask {
  isLeft: boolean;
  isRight: boolean;
}
