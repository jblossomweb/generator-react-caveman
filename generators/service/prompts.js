module.exports = {
  start: [
    {
      type: "input",
      name: "serviceName",
      message: "What is the name of the service?",
      default: "caveman"
    },
    {
      type: "list",
      name: "serviceType",
      message: "What type of service?",
      choices: ["rest"], // TODO: graph", "other"],
      default: "rest"
    }
  ],
  addMethod: [
    {
      type: "confirm",
      name: "addMethod",
      message: "Do you want to add a method?",
      default: false
    }
  ],
  restMethod: [
    {
      type: "list",
      name: "restVerb",
      message: "Which REST verb does this method use?",
      choices: [ "get", "post", "put", "patch", "delete"],
      default: "get"
    },
    {
      type: "input",
      name: "methodName",
      message: "What is the name of the method?",
      default: "getCavemen"
    },
  ],
  addMethodArg: [
    {
      type: "confirm",
      name: "addMethodArg",
      message: "Do you want to add an argument to this method?",
      default: false
    }
  ],
  methodArgs: [
    {
      type: "input",
      name: "methodArgName",
      message: "What is the argument name?",
      default: "arg"
    },
    {
      type: "input",
      name: "methodArgType",
      message: "What is the argument type?",
      default: "string"
    },
  ],
  //
  // methodArgs: [
  //   {
  //     type: "input",
  //     name: "methodArgs",
  //     message: "List any arguments for this method, separated by commas:\n",
  //     default: ""
  //   },
  // ],
  restBodyArg: [
    {
      type: "input",
      name: "restBodyArg",
      message: "What argument(s) should be used for the body?\n(you can include multiple, eg: '{ argOne, argTwo }')\n",
      default: ""
    },
  ],
  restEndpoint: [
    {
      type: "input",
      name: "restEndpoint",
      message: "What is this method's API endpoint?\n(you can include arguments, eg: 'api/endpoint/${id}')\n",
      default: "api/endpoint"
    },
    {
      type: "confirm",
      name: "requireToken",
      message: "Does this API endpoint require a token in the header?",
      default: false
    },
  ],
};
