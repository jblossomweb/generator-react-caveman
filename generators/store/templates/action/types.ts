<% storeActions.forEach(({
  actionType,
}) => { -%>
export const <%= actionType %> = '<%= actionType %>';
<% }); -%>

export interface Interface {

<% storeActions.forEach(({
  actionType,
  actionHasPayload,
  actionPayload,
}) => { -%>
  [<%= actionType %>]: {
    type: '<%= actionType %>',
<% if (actionHasPayload && actionPayload && actionPayload.length) { -%>
    payload: {
<% actionPayload.forEach(({
  actionPayloadName,
  actionPayloadType,
}) => { -%>
      <%= actionPayloadName %>: <%= actionPayloadType %>,
<% }); -%>
    },
<% } -%>
  },

<% }); -%>
};
