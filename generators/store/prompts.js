module.exports = {
  start: [
    {
      type: "input",
      name: "storeName",
      message: "What is the name of the store?",
      default: "caveman"
    }
  ],
  addProp: [
    {
      type: "confirm",
      name: "addProp",
      message: "Add a state property?",
      default: false
    }
  ],
  propDetails: [
    {
      type: "input",
      name: "propName",
      message: "What is the name of the property?",
      default: "isCaveman"
    },
    {
      type: "list",
      name: "propType",
      message: "What is this property's data type?",
      choices: ["boolean", "string", "number", "object"],
      default: "string"
    },
    {
      type: "confirm",
      name: "propUndefined",
      message: "Is this property allowed to be undefined?",
      default: true
    },
    {
      type: "input",
      name: "propDefault",
      message:
        "What is this property's default value?\n(must match data type, use quotes for strings)\n",
      default: "undefined"
    }
  ],
  addAction: [
    {
      type: "confirm",
      name: "addAction",
      message: "Add a state action?",
      default: false
    }
  ],
  actionDetails: [
    {
      type: "input",
      name: "actionName",
      message: "What is the name of the action?",
      default: "DO_SOMETHING"
    },
    {
      type: "confirm",
      name: "actionHasPayload",
      message: "Does the action have a payload?",
      default: false
    }
  ],
  addActionPayload: [
    {
      type: "confirm",
      name: "addActionPayload",
      message: "Add a payload item?",
      default: false
    }
  ],
  actionPayloadDetails: [
    {
      type: "input",
      name: "actionPayloadName",
      message: "What is the payload item's name?",
      default: "key"
    },
    {
      type: "list",
      name: "actionPayloadType",
      message: "What is this payload item's data type?",
      choices: ["boolean", "string", "number", "object"],
      default: "boolean"
    }
  ],
  actionHasThunk: [
    {
      type: "confirm",
      name: "actionHasThunk",
      message: "Does the action require a service call (thunk)?",
      default: false
    }
  ],
  actionThunkDetails: [
    {
      type: "input",
      name: "actionThunkService",
      message: "What is the name of the service?",
      default: "caveman"
    },
    {
      type: "input",
      name: "actionThunkServiceMethod",
      message: "What is the service method to call?",
      default: "postCaveman"
    },
    {
      type: "confirm",
      name: "actionThunkToken",
      message: "Does this method require a token?",
      default: false
    }
  ],
  addActionThunkArgs: [
    {
      type: "confirm",
      name: "addActionThunkArgs",
      message: "Add another required argument for this method?",
      default: false
    }
  ],
  actionThunkArgDetails: [
    {
      type: "confirm",
      name: "actionThunkArg",
      message: "Add another required argument for this method?",
      default: false
    }
  ]
};
