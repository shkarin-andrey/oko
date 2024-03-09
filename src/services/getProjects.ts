import axios from 'axios';

const { VITE_APP_BASE_URL_API } = import.meta.env;

export const getProjects = async (): Promise<Record<string, number>> => {
  const url = `${VITE_APP_BASE_URL_API}/get_projects`;
  const res = await axios.get<Record<string, number>>(url);
  const data = await res.data;

  return data;
};
