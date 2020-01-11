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

    const saveRestMethod = ({
      methodName,
      restVerb,
      requireToken,
      methodArgs,
      restBodyArg,
      restEndpoint,
    }, restMethods) => {
      restMethods.push({
        name: camel(methodName),
        verb: restVerb.toLowerCase(),
        token: requireToken,
        args: methodArgs,
        bodyArg: restBodyArg,
        endpoint: restEndpoint,
      });
      //
      restMethods.forEach(method => {
        this.log(`${method.name}`); // (${method.args.join(", ")})
      })
      //
      return addRestMethods(restMethods);
    };

    const restEndpoint = (props, restMethods) => this.prompt(
      prompts.restEndpoint,
    ).then(({
      restEndpoint,
      requireToken,
    }) => saveRestMethod({
      ...props,
      restEndpoint,
      requireToken,
    }, restMethods));

    const addRestMethodArgs = (props, restMethods) => this.prompt(
      prompts.addMethodArg,
    ).then(({ addMethodArg }) => {
      if (addMethodArg) {
        return this.prompt(
          prompts.methodArgs,
        ).then(({ methodArgName, methodArgType}) => {
          props.methodArgs.push({
            name: methodArgName,
            type: methodArgType,
          });
          return addRestMethodArgs(props, restMethods);
        });
      }
      if (['post', 'put', 'patch'].includes(props.restVerb)) {
        return this.prompt(prompts.restBodyArg).then(({
          restBodyArg,
        }) => restEndpoint({
          ...props,
          restBodyArg,
        }, restMethods));
      }
      return restEndpoint(props, restMethods);
    });

    const addRestMethods = (restMethods) => this.prompt(
      prompts.addMethod,
    ).then(({ addMethod }) => {
      if (addMethod) {
        return this.prompt(prompts.restMethod).then((props) => {
          props.methodArgs = [];
          return addRestMethodArgs(props, restMethods);
        });
      }
      return;
    });

    // const addArgs = () => 

    return this.prompt(prompts.start).then(props => {
      this.props = props;
      this.props.serviceCamel = camel(this.props.serviceName);
      this.props.serviceClass = upperFirst(this.props.serviceCamel);
      if (!this.props.serviceClass.includes('Service')) {
        this.props.serviceClass += 'Service';
      }
      if (this.props.serviceType === 'rest') {
        this.props.restMethods = [];
        return addRestMethods(this.props.restMethods);
      }
      return;
    });
  }

  writing() {
    let template = this.props.serviceType;
    if (template) {
       this.fs.copyTpl(
        this.templatePath(`src/app/services/${template}/`),
        this.destinationPath(`src/app/services/${this.props.serviceCamel}`),
        this.props
      );
    }
  }

  install() {
    this.log(this.props);
    // this.log(yosay(`${chalk.red("installing dependencies...")}`));
    // this.installDependencies({ bower: false });
  }
};
