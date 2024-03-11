export interface ICircleProgress {
  progress: number;
  size?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: React.SVGAttributes<SVGCircleElement>['strokeLinecap'];
  label?: string;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
}
