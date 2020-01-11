import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import ExternalLink, { Props } from '.';


export const mockProps: Props = {
  href: 'https://www.google.com',
  children: 'Link Text',
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <ExternalLink href={knobs.text('href', props.href)}>
    {knobs.text('children', props.children as string)}
  </ExternalLink>
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
  'html children': renderScene({
    ...mockProps,
    children: (<span>children</span>),
  }),
};

storyBuilder(
  scenes,
  'atoms/ExternalLink',
  Template,
);
