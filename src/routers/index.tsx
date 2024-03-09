import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layout';
import { routsLoader } from '../layout/Layout';
import { ErrorPage, IndexPage, ProjectPage } from '../pages';
import { Paths } from './routers.config';

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: Paths.root,
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: routsLoader(queryClient),
      children: [
        { index: true, element: <IndexPage /> },
        /* existing routes */
        {
          path: Paths.projectsDetail,
          element: <ProjectPage />,
        },
      ],
    },
  ]);
