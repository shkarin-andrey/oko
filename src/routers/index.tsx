import { ErrorPage, IndexPage, ProjectPage } from '../pages';
import LoginPage from '../pages/LoginPage';
import { Paths } from './routers.config';

export const authRouts = [
  {
    path: Paths.root,
    component: LoginPage,
  },
];

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
