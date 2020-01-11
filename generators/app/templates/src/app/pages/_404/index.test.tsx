import forEach from 'lodash/forEach';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { getTestScenes, mountScenes } from 'core/test';
import LightCentered from 'app/templates/LightCentered';
import { scenes } from './stories';
import Page404 from './';

const testScenes = getTestScenes(
  mountScenes(scenes),
  Page404,
  component => ({
    template: component.find(LightCentered),
    p: component.find('p'),
    link: component.find(Link),
    button: component.find(Button),
}));

describe('components/pages/404Page', () => {
  it(`always mounts the Page404 component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });

  it(`always wraps with the LightCentered template`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.template.length).toBe(1);
    });
  });

  it(`always renders 2 <p> elements`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.p.length).toBe(2);
    });
  });

  it(`always mounts a router Link component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.link.length).toBe(1);
    });
  });

  it(`always Links to '/' route`, () => {
    forEach(testScenes, scene => {
      const { link } = scene.elements;
      const props = link.props();
      expect(props.to).toEqual('/');
    });
  });

  it(`always mounts a semantic Button component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.button.length).toBe(1);
    });
  });

  it(`always sets semantic Button component as 'primary'`, () => {
    forEach(testScenes, scene => {
      const { button } = scene.elements;
      const props = button.props();
      expect(props.primary).toBe(true);
    });
  });

  it(`always renders expected text in semantic Button component`, () => {
    forEach(testScenes, scene => {
      const { button } = scene.elements;
      const text = button.text();
      const expectedText = 'Back to Home';
      expect(text).toBe(expectedText);
    });
  });
});
