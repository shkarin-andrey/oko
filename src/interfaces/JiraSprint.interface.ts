export interface JiraSprint {
  id: number;
  self: string;
  state: JiraSprintState;
  name: string;
  startDate: Date;
  endDate: Date;
  completeDate?: Date;
  createdDate: Date;
  originBoardId: number;
  goal: string;
}

export enum JiraSprintState {
  Active = 'active',
  Closed = 'closed',
}
