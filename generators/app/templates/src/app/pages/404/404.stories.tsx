import React from 'react';

import { storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import Page404 from './404';

export const renderScene = () => () => (
  <Page404 />
);

export const scenes = {
  'default': renderScene(),
};

storyBuilder(
  scenes,
  'pages/404',
  Template,
);
