const rootPath = '<%= storeCamel %>';

const paths = {
<% storeProps.forEach(({ propName }) => { -%>
  <%= propName %>: () => [rootPath, '<%= propName %>'],
<% }); -%>
};

export default paths;
