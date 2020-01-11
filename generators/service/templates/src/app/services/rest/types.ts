import { RestInterface } from 'core/rest/types';
<%
const verbs = [];
restMethods.forEach(({ verb }) => { 
  if (!verbs.includes(verb)) {
    verbs.push(verb);
  }
});
-%>

export interface RequestInterface {
<% restMethods.forEach(({ name }) => { -%>
  <%= name %>: any, // TODO: request typing for <%= name %>
<% }) -%>
};

export interface ResponseInterface {
<% restMethods.forEach(({ name }) => { -%>
  <%= name %>Success: any, // TODO: success response typing for <%= name %>
  <%= name %>Error: any, // TODO: error response typing for <%= name %>
<% }) -%>
};

export interface ServiceRestInterface {
<% verbs.forEach(verb => { -%>
  <%= verb %>: RestInterface['<%= verb %>'],
<% }) -%>
};

export interface ServiceInterface {
<% restMethods.forEach(({ name, args, token }) => { %>
  <%= name %>: (
<% if (args.length) { args.forEach(arg => { -%>
    <%= arg ? `${arg.name}: ${arg.type},` : null %>
<% }) } -%>
<% if (token) { -%>
    token: string,
<% } -%>
  ) => Promise<
    ResponseInterface['<%= name %>Success'] |
    ResponseInterface['<%= name %>Error']
  >,
<% }) %>
};
