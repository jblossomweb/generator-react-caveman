import * as types from './types';

<% storeActions.forEach(({
  actionName,
  actionType,
  actionCamel,
  actionHasPayload,
  actionPayload,
}) => { -%>
/*
 * <%= actionType %>
 */

<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
export const <%= actionCamel %>: (
<% actionPayload.forEach(({
  actionPayloadName,
  actionPayloadType,
}) => { -%>
  <%= actionPayloadName %>: <%= actionPayloadType %>,
<% }); -%>
) => types.Interface['<%= actionType %>'] = page => ({
  type: types.<%= actionType %>,
  payload: {
<% actionPayload.forEach(({
  actionPayloadName,
}) => { -%>
    <%= actionPayloadName %>,
<% }); -%>
  },
});
<% } else { -%>
export const <%= actionCamel %>: () => types.Interface[
  '<%= actionType %>'
] = () => ({
  type: types.<%= actionType %>,
});
<% } -%>

<% }); -%>
