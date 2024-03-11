import { ErrorPage, IndexPage, ProjectPage } from '../pages';
import { Paths } from './routers.config';

export const routs = [
  {
    path: Paths.root,
    component: IndexPage,
  },
  {
    path: Paths.projectsDetail,
    component: ProjectPage,
  },
  {
    path: '*',
    component: ErrorPage,
  },
];
