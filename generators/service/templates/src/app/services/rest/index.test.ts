import * as restMocks from 'core/rest/mocks';

import <%= serviceClass %> from './';
import {
  ServiceRestInterface as <%= serviceClass %>RestInterface,
} from './types';
<%
const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);
const verbs = [];
restMethods.forEach(({ verb }) => { 
  if (!verbs.includes(verb)) {
    verbs.push(verb);
  }
});
-%>

const mockRest: <%= serviceClass %>RestInterface = {
<% verbs.forEach(verb => { -%>
  <%= verb %>: restMocks.mockRest().<%= verb %>,
<% }) -%>
};

const spies = {
<% verbs.forEach(verb => { -%>
  <%= verb %>: jest.spyOn(mockRest, '<%= verb %>'),
<% }) -%>
}

<% if (typeof serviceApiKey !== 'undefined') { -%>
const mockService = new <%= serviceClass %>(restMocks.mockUrl, restMocks.mockApiKey, mockRest);
<% } else { -%>
  const mockService = new <%= serviceClass %>(restMocks.mockUrl, mockRest);
<% } -%>

describe('services/<%= serviceCamel %>', () => {
<% restMethods.forEach(({ name, verb, args, bodyArg, token, endpoint }) => { -%>

  describe('<%= name %>', () => {
<% if (token) { -%>
    const mockToken = 'abcdefghijklmnopqrstuvwxyz123456789'; // TODO: use mock token response json
<% } -%>
<% if (args.length) { args.forEach(arg => { // TODO: collect and interrogate arg type -%>
<%
  let mockValue = 0;
  switch(arg.type) {
    case 'number':
      mockValue = '123';
      break;
    case 'string':
      mockValue = `'abasdfc'`;
      break;
    case 'boolean':
      mockValue = 'true';
      break;
    case 'any':
    default:
      mockValue = '{}';
  }
-%>
    const mock<%= upperFirst(arg.name) %> = <%- mockValue %>; // TODO: mock a meaningful value
<% }) } -%>
    const headers = {
      'Content-Type': 'application/json',
<% if (token) { -%>
      'Authorization': `Bearer ${mockToken}`,
<% } -%>
    };
<%
  // determine whether endpoint is a compound
  const endpointTrim = endpoint.replace(/\s/g, '');
  const matches = endpointTrim.match(/\${[A-z]*}/g);
  let endpointVal = endpoint;
  if (matches && matches.length) {
    matches.forEach(match => {
      const argName = match.replace('${', '').replace('}', '');
      endpointVal = endpointVal.replace(match, '${mock'+upperFirst(argName)+'}');
    });
  }
-%>
    const endpoint = `/<%= endpointVal %>`;
<% if (bodyArg) { -%>
<%
  // determine whether bodyArg is a compound
  const bodyTrim = bodyArg.replace(/\s/g, '');
  let bodyVal = `mock${upperFirst(bodyArg)}`;
  if (
    bodyTrim.includes('{') &&
    bodyTrim.includes('}')
  ) {
    bodyVal = '{\n';
    const bodyArgString = bodyTrim.replace('{', '').replace('}', ''); //
    const bodyArgArray = bodyArgString.split(',');
    bodyArgArray.forEach(item => {
      bodyVal += `      ${item}: mock${upperFirst(item)},\n`;
    });
    bodyVal += `    }`;
  }
-%>
    const body = <%= bodyVal %>;
<% } -%>
    beforeEach(async () => {
      await mockService.<%= name %>(
<% if (args.length) { args.forEach(arg => { -%>
        <%= arg ? `mock${upperFirst(arg.name)},` : null %>
<% }) } -%>
<% if (token) { -%>
        mockToken,
<% } -%>
      );
    });
    it(`makes a <%= verb.toUpperCase() %> request`, () => {
      expect(spies.<%= verb %>).toHaveBeenCalled();
    });
    it(`makes a <%= verb.toUpperCase() %> request to ${endpoint} with proper <%= bodyArg ? 'body and ' : '' %>headers`, () => {
      expect(spies.<%= verb %>).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
<% if (bodyArg) { -%>
        body,
<% } -%>
        { headers },
      );
    });
  });
<% }) -%>
});
