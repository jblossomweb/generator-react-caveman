import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './ExternalLink.stories';
import ExternalLink from './ExternalLink';

const testScenes = getTestScenes(
  mountScenes(scenes),
  ExternalLink,
  component => ({
    anchor: component.find('a'),
}));

describe('components/atoms/ExternalLink', () => {
  it(`always mounts the ExternalLink component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
  it(`always mounts an anchor element`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.anchor.length).toBe(1);
    });
  });
  it(`always passes href prop to anchor element`, () => {
    forEach(testScenes, scene => {
      const anchor = scene.elements.anchor;
      expect(anchor.props().href).toEqual(scene.props.href);
    });
  });
  it(`always mounts anchor element with target="_blank"`, () => {
    forEach(testScenes, scene => {
      const anchor = scene.elements.anchor;
      expect(anchor.props().target).toEqual("_blank");
    });
  });
  it(`always nests children inside anchor element`, () => {
    forEach(testScenes, scene => {
      const anchor = scene.elements.anchor;
      expect (anchor.contains(scene.props.children)).toBe(true);
    });
  });
});
