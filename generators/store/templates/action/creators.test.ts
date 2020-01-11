<%
const getTestValue = type => {
  switch(type) {
    case 'boolean': return `true`;
    case 'number': return `1234567`;
    case 'string': return `'abcdefg'`;
    case 'object': return `{ foo: 'bar' }`;
  }
};
-%>
import * as actionTypes from './types';
import * as actionCreators from './creators';

describe('store/Auth/action/creators', () => {
<% storeActions.forEach(({
  actionName,
  actionType,
  actionCamel,
  actionHasPayload,
  actionPayload,
}) => { -%>

  describe('<%= actionCamel %>', () => {
<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
<% actionPayload.forEach(({
  actionPayloadName,
  actionPayloadType,
}) => { -%>
    const <%= actionPayloadName %>: <%= actionPayloadType %> = <%- getTestValue(actionPayloadType) %>;
<% }); -%>
<% } -%>
<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
    const action: actionTypes.Interface['<%= actionType %>'] = actionCreators
      .<%= actionCamel %>(
<% actionPayload.forEach(({
  actionPayloadName,
}) => { -%>
        <%= actionPayloadName %>,
<% }); -%>
      )
    ;
<% } else { -%>
    const action: actionTypes.Interface['<%= actionType %>'] = actionCreators.<%= actionCamel %>();
<% } -%>
    const expectedAction: actionTypes.Interface['<%= actionType %>'] = {
      type: actionTypes.<%= actionType %>,
<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
      payload: {
<% actionPayload.forEach(({
  actionPayloadName,
}) => { -%>
        <%= actionPayloadName %>,
<% }); -%>
      }
<% } -%>
    };

    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
<% actionPayload.forEach(({
  actionPayloadName,
}) => { -%>

    it(`should return '<%= actionPayloadName %>' in action payload`, () => {
      expect(action.payload.<%= actionPayloadName %>).toEqual(expectedAction.payload.<%= actionPayloadName %>);
    });
<% }); -%>
<% } -%>
  });

<% }); -%>
});
