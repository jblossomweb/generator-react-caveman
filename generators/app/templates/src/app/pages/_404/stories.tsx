import React from 'react';

import { storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import Page404 from './';

export const renderScene = () => () => (
  <Page404 />
);

export const scenes = {
  'default': renderScene(),
};

storyBuilder(
  scenes,
  'pages/_404',
  Template,
);
