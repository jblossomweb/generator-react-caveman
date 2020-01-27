import { SemanticICONS } from 'semantic-ui-react';
import { Route as CoreRoute } from 'core/routes';

import Page404 from 'app/pages/404';
import HomePage from 'app/pages/HomePage';

export interface Route extends CoreRoute {
  icon?: SemanticICONS,
};

export const menu: Route[] = [
  /* put menu routes here so they can be looped separately */
];

export const routes: Route[] = [
  {
    path: `/home`,
    page: HomePage,
  },
  ...menu,
  {
    path: `/404`,
    page: Page404,
  },
];

export const redirects: Redirect[] = [
  {
    from: `/`,
    to: `/home`,
  },
  {
    to: `/404`
  },
];

export default routes;
