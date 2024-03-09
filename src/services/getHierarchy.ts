import axios from 'axios';

import { Hierarchy } from '../interfaces/Hierarchy.interface';

const { VITE_APP_BASE_URL_API } = import.meta.env;

export const getHierarchy = async (body: {
  board_id: number;
  sprint_id: number;
}): Promise<Hierarchy> => {
  const url = `${VITE_APP_BASE_URL_API}/get_hierarchy`;
  const params = {
    board_id: body.board_id,
    sprint_id: body.sprint_id,
    show_bugs: true,
    show_deep_tasks: true,
  };

  const res = await axios.get<Hierarchy>(url, {
    params,
  });
  const data = await res.data;

  return data;
};
