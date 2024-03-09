import axios from 'axios';

import { JiraSprint } from '../interfaces/JiraSprint.interface';

const { VITE_APP_BASE_URL_API } = import.meta.env;

export const getSprints = async (id: string | number): Promise<JiraSprint[]> => {
  const url = `${VITE_APP_BASE_URL_API}/get_sprint_list`;
  const res = await axios.get<JiraSprint[]>(url, {
    params: {
      board_id: id,
    },
  });
  const data = await res.data;

  return data;
};
