import {
  ServiceInterface,
  ServiceRestInterface,
} from './types';
<%
const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);
const verbs = [];
const restUtils = [];
restMethods.forEach(({ verb }) => { 
  if (!verbs.includes(verb)) {
    verbs.push(verb);
    restUtils.push({
      name: `promise${upperFirst(verb)}`,
      verb,
    });
  }
});
-%>
<% if (restMethods.length) { %>
import {
<% restUtils.forEach(util => { -%>
<%= `  ${util.name}` %>,
<% }); -%>
} from 'core/rest/utils';
<% } -%>

class <%= serviceClass %> implements ServiceInterface {
  private apiUrl: string;
<% if (serviceApiKey) { -%>
  private apiKey: string;
<% } -%>
  private rest: ServiceRestInterface;

  constructor (
    apiUrl: string,
<% if (serviceApiKey) { -%>
    apiKey: string,
<% } -%>
    rest: ServiceRestInterface,
  ) {
    this.apiUrl = apiUrl;
<% if (serviceApiKey) { -%>
    this.apiKey = apiKey;
<% } -%>
    this.rest = rest;
  }<% restMethods.forEach(method => { -%>
<% const restUtil = restUtils.find(util => util.verb === method.verb) %>

  public <%= method.name %> (
<% if (method.args.length) { method.args.forEach(arg => { -%>
    <%= arg ? `${arg.name}: ${arg.type},` : null %>
<% }) } -%>
<% if (method.token) { -%>
    token: string,
<% } -%>
  ) {
    const headers = {
      'Content-Type': 'application/json',
<% if (serviceApiKey && serviceApiKeyLocation === 'header') { -%>
      '<%= serviceApiKeyVar %>': `${this.apiKey}`,
<% } -%>
<% if (method.token) { -%>
      'Authorization': `Bearer ${token}`,
<% } -%>
    };
    const endpoint = `/<%= method.endpoint %>`;
<% if (serviceApiKey && serviceApiKeyLocation === 'queryString') { -%>
    const url = `${this.apiUrl}${endpoint}?<%= serviceApiKeyVar %>=${this.apiKey}`;
<% } else { -%>
    const url = `${this.apiUrl}${endpoint}`;
<% } -%>
<% if (method.bodyArg) { -%>
    const body = <%= method.bodyArg %>;
<% } -%>
    return <%= restUtil.name %>({
      url,
<% if (method.bodyArg) { -%>
      body,
<% } -%>
      headers,
    }, this.rest);
  }<% }); %>
};

export default <%= serviceClass %>;
