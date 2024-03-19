export interface Hierarchy {
  burndown: Burndown;
  statistics: Statistics;
  tasks: Record<string, RootTask>;
}

export interface Burndown {
  data: BurndownItem[];
}

export interface BurndownItem {
  date: string;
  remaining_tasks: number;
}

export interface RootTask {
  key: string;
  summary: string;
  children: RootTask[];
  links: any[];
  is_root: boolean;
  increment_points: number;
  is_bug: boolean;
  inherited_increment_points: number;
  description: string[];
  status: (string | null)[];
  avatar: string[];
  assignee: string;
  color: string;
  tshirt: string | null;
}

export interface Statistics {
  total_bugs: number;
  total_sprint_days: number;
  days_passed: number;
  total_issues: number;
  completed_issues: number;
  sprint_completion_percentage: number;
  tehdolg_percentage: number;
  assignees: Record<string, Assignee>;
  authors: Record<string, Assignee>;
  reviewers: Record<string, Assignee>;
  testers: Record<string, Assignee>;
  images: Record<string, Image>;
}

export interface Assignee {
  count: number;
  avatar: string;
  done_tasks: number;
}

export interface Image {
  status: string;
  increment_points: number;
  inherited_increment_points: number;
}
