import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_APP_BASE_URL_API } = import.meta.env;

const staticApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_APP_BASE_URL_API,
  }),
  endpoints: () => ({}),
});

export const api = staticApi.enhanceEndpoints({ addTagTypes: [] });
