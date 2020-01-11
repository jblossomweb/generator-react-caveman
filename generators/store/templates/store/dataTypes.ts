<%
let hasMap = false;
storeProps.forEach(({ propType }) => {
  if (propType === 'Map') {
    hasMap = true;
  }
})
-%>
<%- hasMap ? `import { Map } from 'immutable';\n\n` : '' -%>
<% storeProps.forEach(({
  upperCasePropName,
  propType,
  propUndefined,
  propDefault,
}) => { -%>
<%
if (propType === 'Map') {
  propDefault = propDefault === 'undefined' ? propDefault : `Map(${propDefault})`;
  propType = 'Map<string, any>';
}
-%>
export type <%= upperCasePropName %> = <%- propType %><%= propUndefined ? ' | undefined' : ''%>;
export const default<%= upperCasePropName %>: <%= upperCasePropName %> = <%- propDefault %>;

<%}) -%>