import { getInitialState } from 'core/store';

import paths from './paths';
import * as selectors from './selectors';
import {
  examplePathName,
  exampleQueryParams,
} from './dataTypes';

describe('store/router/selectors', () => {

  describe('getPathName', () => {
    const path = paths.pathName();
    const value = examplePathName;
    const state = getInitialState().setIn(path, value);
    it('should select correct value from pathName', () => {
      const selected = selectors.getPathName(state);
      expect(selected).toEqual(value);
    });
  });

  describe('getQueryParams', () => {
    const path = paths.queryParams();
    const value = exampleQueryParams;
    const state = getInitialState().setIn(path, value);
    it('should select correct value from queryParams', () => {
      const selected = selectors.getQueryParams(state);
      expect(selected).toEqual(value);
    });
  });

});
