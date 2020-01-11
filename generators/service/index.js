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

    const saveRestMethod = (
      {
        methodName,
        restVerb,
        requireToken,
        methodArgs,
        restBodyArg,
        restEndpoint
      },
      restMethods
    ) => {
      restMethods.push({
        name: camel(methodName),
        verb: restVerb.toLowerCase(),
        token: requireToken,
        args: methodArgs,
        bodyArg: restBodyArg,
        endpoint: restEndpoint
      });
      restMethods.forEach(method => {
        this.log(`${method.name}`);
      });
      return addRestMethods(restMethods);
    };

    const restEndpoint = (props, restMethods) =>
      this.prompt(prompts.restEndpoint).then(({ restEndpoint, requireToken }) =>
        saveRestMethod(
          {
            ...props,
            restEndpoint,
            requireToken
          },
          restMethods
        )
      );

    const addRestMethodArgs = (props, restMethods) =>
      this.prompt(prompts.addMethodArg).then(({ addMethodArg }) => {
        if (addMethodArg) {
          return this.prompt(prompts.methodArgs).then(
            ({ methodArgName, methodArgType }) => {
              props.methodArgs.push({
                name: methodArgName,
                type: methodArgType
              });
              return addRestMethodArgs(props, restMethods);
            }
          );
        }
        if (["post", "put", "patch"].includes(props.restVerb)) {
          return this.prompt(prompts.restBodyArg).then(({ restBodyArg }) =>
            restEndpoint(
              {
                ...props,
                restBodyArg
              },
              restMethods
            )
          );
        }
        return restEndpoint(props, restMethods);
      });

    const addRestMethods = restMethods =>
      this.prompt(prompts.addMethod).then(({ addMethod }) => {
        if (addMethod) {
          return this.prompt(prompts.restMethod).then(props => {
            props.methodArgs = [];
            return addRestMethodArgs(props, restMethods);
          });
        }
        return true;
      });

    const addMethods = () => {
      if (this.props.serviceType === "rest") {
        this.props.restMethods = [];
        return addRestMethods(this.props.restMethods);
      }
      return true;
    };

    const serviceInfo = () => {
      if (this.props.hasUrl) {
        return this.prompt(prompts.serviceUrl).then(
          ({ serviceUrl, hasApiKey }) => {
            this.props.serviceUrl = serviceUrl;
            if (hasApiKey) {
              return this.prompt(prompts.serviceApiKey).then(
                ({
                  serviceApiKey,
                  serviceApiKeyVar,
                  serviceApiKeyLocation
                }) => {
                  this.props.serviceApiKey = serviceApiKey;
                  this.props.serviceApiKeyVar = serviceApiKeyVar;
                  this.props.serviceApiKeyLocation = serviceApiKeyLocation;
                  return addMethods();
                }
              );
            }
            return addMethods();
          }
        );
      }
      return addMethods();
    };

    const start = () =>
      this.prompt(prompts.start).then(props => {
        this.props = props;
        this.props.serviceCamel = camel(this.props.serviceName);
        this.props.serviceClass = upperFirst(this.props.serviceCamel);
        if (!this.props.serviceClass.includes("Service")) {
          this.props.serviceClass += "Service";
        }
        return serviceInfo();
      });

    return start();
  }

  writing() {
    let template = this.props.serviceType;
    if (template) {
      this.fs.copyTpl(
        this.templatePath(`src/app/services/${template}/`),
        this.destinationPath(`src/app/services/${this.props.serviceCamel}`),
        this.props
      );
      if (this.props.hasUrl && this.props.serviceUrl) {
        const envVar = `REACT_APP_${this.props.serviceCamel.toUpperCase()}_SERVICE_URL`;
        let envLine = `${envVar}=${this.props.serviceUrl}`;
        let envExampleLine = envLine;

        let apiKeyEnvVar = null;
        let apiKeyEnvLine = null;
        let apiKeyEnvExampleLine = null;
        if (this.props.serviceApiKey) {
          apiKeyEnvVar = `REACT_APP_${this.props.serviceCamel.toUpperCase()}_SERVICE_API_KEY`;
          apiKeyEnvLine = `${apiKeyEnvVar}=${this.props.serviceApiKey}`;
          apiKeyEnvExampleLine = `${apiKeyEnvVar}=<<INSERT_ENV_SPECIFIC_API_KEY_HERE>>`;
          envLine += `\n${apiKeyEnvLine}`;
          envExampleLine += `\n${apiKeyEnvExampleLine}`;
        }
        const envPath = this.destinationPath(`.env`);
        const envExamplePath = this.destinationPath(`.env.example`);
        const envHook = `# SERVICE URLS`;
        const env = this.fs.read(envPath);
        const envExample = this.fs.read(envExamplePath);

        let configLine = `    ${this.props.serviceCamel}: {\n      url: process.env.${envVar},`;
        if (this.props.serviceApiKey && apiKeyEnvVar) {
          configLine += `\n      apiKey: process.env.${apiKeyEnvVar},`;
        }
        configLine += `\n    },`;
        const configPath = this.destinationPath(`src/app/config.ts`);
        const configHook = `/* import service env vars here */`;
        const config = this.fs.read(configPath);

        this.conflicter.force = true;
        this.fs.write(envPath, env.replace(envHook, `${envHook}\n${envLine}`));
        this.fs.write(
          envExamplePath,
          envExample.replace(envHook, `${envHook}\n${envExampleLine}`)
        );

        this.fs.write(
          configPath,
          config.replace(configHook, `${configHook}\n${configLine}`)
        );
      }
    }
  }

  install() {
    this.log(this.props);
  }
};
