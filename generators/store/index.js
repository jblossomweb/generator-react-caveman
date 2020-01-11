"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const camel = require("camelcase");

const prompts = require("./prompts");
const { upperFirst } = require("./utils");

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`So easy, a ${chalk.red("caveman")} can do it.`));

    const addStoreActionPayload = actionPayload =>
      this.prompt(prompts.addActionPayload).then(({ addActionPayload }) => {
        if (addActionPayload) {
          return this.prompt(prompts.actionPayloadDetails).then(
            actionPayloadDetails => {
              actionPayloadDetails.actionPayloadName = camel(
                actionPayloadDetails.actionPayloadName
              );
              actionPayloadDetails.upperCasePayloadName = upperFirst(
                actionPayloadDetails.actionPayloadName
              );
              actionPayload.push(actionPayloadDetails);
              return addStoreActionPayload(actionPayload);
            }
          );
        }
        return true;
      });

    const addStoreActions = (storeName, storeActions) =>
      this.prompt(prompts.addAction).then(({ addAction }) => {
        if (addAction) {
          return this.prompt(prompts.actionDetails).then(actionDetails => {
            actionDetails.actionType = (
              `${storeName}_` + actionDetails.actionName.replace(/ /g, "_")
            ).toUpperCase();
            actionDetails.actionCamel = camel(actionDetails.actionName);
            actionDetails.upperCaseActionCamel = upperFirst(
              actionDetails.actionCamel
            );
            if (actionDetails.actionHasPayload) {
              actionDetails.actionPayload = [];
              return addStoreActionPayload(actionDetails.actionPayload).then(
                () => {
                  storeActions.push(actionDetails);
                  return addStoreActions(storeName, storeActions);
                }
              );
            }
            storeActions.push(actionDetails);
            return addStoreActions(storeName, storeActions);
          });
        }
        return true;
      });

    const addStoreProps = storeProps =>
      this.prompt(prompts.addProp).then(({ addProp }) => {
        if (addProp) {
          return this.prompt(prompts.propDetails).then(propDetails => {
            propDetails.propName = camel(propDetails.propName);
            propDetails.upperCasePropName = upperFirst(propDetails.propName);
            if (propDetails.propType === "object") {
              propDetails.propType = "Map";
            }
            storeProps.push(propDetails);
            return addStoreProps(storeProps);
          });
        }
        this.props.storeActions = [];
        return addStoreActions(this.props.storeName, this.props.storeActions);
      });

    return this.prompt(prompts.start).then(props => {
      this.props = props;
      this.props.storeCamel = camel(this.props.storeName);
      this.props.storeClass = upperFirst(this.props.storeCamel);
      if (!this.props.storeClass.includes("Store")) {
        this.props.storeClass += "Store";
      }
      this.props.storeProps = [];
      return addStoreProps(this.props.storeProps);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`store`),
      this.destinationPath(`src/app/store/${this.props.storeCamel}`),
      this.props
    );

    if (this.props.storeActions && this.props.storeActions.length) {
      this.fs.copyTpl(
        this.templatePath(`action`),
        this.destinationPath(`src/app/store/${this.props.storeCamel}/action`),
        this.props
      );
      const importReducers = `import ${this.props.storeCamel}Reducers from 'app/store/${this.props.storeCamel}/action/reducers';`;
      const registerReducers = `  ${this.props.storeCamel}Reducers,`;
      const rootReducerPath = this.destinationPath(
        `src/app/store/rootReducer.ts`
      );
      const rootReducerImportHook = `/* import your reducers here. */`;
      const rootReducerRegisterHook = `/* register your reducers here. */`;
      const rootReducer = this.fs.read(rootReducerPath);
      this.conflicter.force = true;
      this.fs.write(
        rootReducerPath,
        rootReducer
          .replace(
            rootReducerImportHook,
            `${rootReducerImportHook}\n${importReducers}`
          )
          .replace(
            rootReducerRegisterHook,
            `${rootReducerRegisterHook}\n${registerReducers}`
          )
      );
    }
  }

  install() {
    this.log(this.props);
  }
};
