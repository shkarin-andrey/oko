import { Hierarchy } from '../../interfaces/Hierarchy.interface';
import { api } from './api';

type GetHierarchyProps = {
  board_id: number;
  sprint_id: number;
};

export const apiHierarchySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getHierarchy: builder.query<Hierarchy, GetHierarchyProps>({
      query: ({ board_id, sprint_id }) => ({
        url: `get_hierarchy`,
        params: {
          board_id,
          sprint_id,
          show_bugs: true,
          show_deep_tasks: true,
        },
      }),
    }),
  }),
});

export const { useGetHierarchyQuery, useLazyGetHierarchyQuery } = apiHierarchySlice;
