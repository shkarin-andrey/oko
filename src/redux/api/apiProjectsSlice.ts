import { IRouts } from '../../interfaces/Routs.interface';
import { api } from './api';

export const apiProjectsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IRouts[], void>({
      query: () => `get_projects`,
      transformResponse: (response: Record<string, number>) => {
        const keys = Object.keys(response);
        const routs = keys.map((item) => ({
          value: item,
          to: response[item],
        }));

        return routs;
      },
    }),
  }),
});

export const { useGetProjectsQuery } = apiProjectsSlice;
