import { RouteProps } from 'react-router-dom';

export interface Route {
  path: string,
  page: RouteProps['component'],
  title?: string,
};

export interface Redirect {
  from?: string,
  to: string,
};
