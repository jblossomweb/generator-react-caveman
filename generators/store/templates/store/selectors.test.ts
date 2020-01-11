<%
let hasMap = false;
storeProps.forEach(({ propType }) => {
  if (propType === 'Map') {
    hasMap = true;
  }
})
-%>
<% if (hasMap) { -%>
import { Map } from 'immutable';
<% } -%>
import concat from 'lodash/concat';
import { getInitialState } from 'core/store';

import paths from './paths';
import * as selectors from './selectors';

describe('store/<%= storeCamel %>/selectors', () => {
<% storeProps.forEach(({
  propType,
  propName,
  upperCasePropName,
}) => { -%>
<%
let propTestValue;
switch(propType) {
  case 'boolean':
    propTestValue = `true`;
    break;
  case 'number':
    propTestValue = `1234567`;
    break;
  case 'string':
    propTestValue = `'abcdefg'`;
    break;
  case 'object':
  case 'Map':
    propTestValue = `Map({ foo: 'bar'})`;
    break;
}
-%>

  describe('get<%= upperCasePropName %>', () => {
    const path = concat(['app'], paths.<%= propName %>());
    const value = <%- propTestValue %>;
    const state = getInitialState().setIn(path, value);
    it('should select value from <%= propName %>', () => {
      const selected = selectors.get<%= upperCasePropName %>(state);
      expect(selected).toEqual(value);
    });
  });

<% }); -%>
});
