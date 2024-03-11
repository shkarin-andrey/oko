import { JiraSprint, JiraSprintState } from '../../interfaces/JiraSprint.interface';
import { api } from './api';

type ReqSprint = {
  value: number;
  label: string;
};

export const apiSprintsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSprints: builder.query<ReqSprint[], string | number>({
      query: (board_id) => ({
        url: `get_sprint_list`,
        params: { board_id },
      }),
      transformResponse: (response: JiraSprint[]) => {
        return response
          .filter((item) => item.state === JiraSprintState.Active)
          .map((item) => ({ value: item.id, label: item.name }));
      },
    }),
  }),
});

export const { useGetSprintsQuery } = apiSprintsSlice;
