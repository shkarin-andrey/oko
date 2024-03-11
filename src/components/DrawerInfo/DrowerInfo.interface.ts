import { BurndownItem, Statistics } from '../../interfaces/Hierarchy.interface';

export interface IDrowerInfo {
  statistics: Statistics;
  isOpenInformations: boolean;
  burndown: BurndownItem[];
  isLoading?: boolean;
}
