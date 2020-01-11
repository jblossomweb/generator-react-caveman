"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const slug = require("slug");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`So easy, a ${chalk.red("caveman")} can do it.`));

    const prompts = [
      {
        type: "confirm",
        name: "isCaveman",
        message: "Are you a caveman?",
        default: true
      },
      {
        type: "input",
        name: "appName",
        message: "What is your app name?",
        default: "Caveman SPA"
      },
      {
        type: "input",
        name: "appDesc",
        message: "What is your app description?",
        default: "So easy, a caveman can do it."
      },
      {
        type: "input",
        name: "port",
        message: "What port do you want to use for local dev?",
        default: "3000"
      },
      {
        type: "input",
        name: "storyPort",
        message: "What port do you want to use for the storybook?",
        default: "9001"
      },
      {
        type: "input",
        name: "craVersion",
        message: "What version of react-scripts would you like to use?",
        default: "3.2.0"
      },
      {
        type: "input",
        name: "codeOwners",
        message:
          "If you'd like, add some GitHub code owners (eg: '@fred, @barney')",
        default: ""
      },
      {
        type: "confirm",
        name: "firebase",
        message: "Do you want to use firebase for easy deploy?",
        default: false
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.isCaveman;
      this.props = props;
      this.props.appSlug = slug(this.props.appName).toLowerCase();

      if (this.props.firebase) {
        return this.prompt([
          {
            type: "input",
            name: "firebaseApp",
            message: `default firebase project name for ${this.props.appName}`,
            default: this.props.appSlug
          },
          {
            type: "confirm",
            name: "firebaseStorybook",
            message: "Do you want to use firebase for the storybook, too?",
            default: false
          }
        ]).then(fbProps => {
          this.props.firebaseApp = fbProps.firebaseApp;
          this.props.firebaseStorybook = fbProps.firebaseStorybook;
          if (this.props.firebaseStorybook) {
            return this.prompt([
              {
                type: "input",
                name: "firebaseStorybookApp",
                message: `default firebase project name for the storybook`,
                default: `${this.props.appSlug}-storybook`
              }
            ]).then(fbStorybookProps => {
              this.props.firebaseStorybookApp = fbStorybookProps.firebaseStorybookApp;
            });
          } else {
            return;
          }
        })
      } else {
        return;
      }
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(".env.example"),
      this.destinationPath(".env.example"),
      {
        appName: this.props.appName,
        appDesc: this.props.appDesc
      }
    );
    this.fs.copyTpl(
      this.templatePath(".env.example"),
      this.destinationPath(".env"),
      {
        appName: this.props.appName,
        appDesc: this.props.appDesc
      }
    );
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("CHANGELOG.md"),
      this.destinationPath("CHANGELOG.md")
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        appName: this.props.appName,
        appDesc: this.props.appDesc
      }
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        appSlug: this.props.appSlug,
        appName: this.props.appName,
        appDesc: this.props.appDesc,
        port: this.props.port,
        storyPort: this.props.storyPort,
        craVersion: this.props.craVersion
      }
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("tslint.json"),
      this.destinationPath("tslint.json")
    );
    this.fs.copy(this.templatePath("public/*"), this.destinationPath("public"));
    this.fs.copy(
      this.templatePath(".storybook/*"),
      this.destinationPath(".storybook")
    );
    this.fs.copyTpl(
      this.templatePath(".github/*"),
      this.destinationPath(".github"),
      {
        codeOwners: this.props.codeOwners
      }
    );
    this.fs.copyTpl(
      this.templatePath("src"),
      this.destinationPath("src"),
      this.props
    );
    if (this.props.firebase) {
      this.fs.copy(
        this.templatePath("firebase.json"),
        this.destinationPath("firebase.json")
      );
      this.fs.copyTpl(
        this.templatePath(".firebaserc"),
        this.destinationPath(".firebaserc"),
        {
          firebaseApp: this.props.firebaseApp
        }
      );
    }
    if (this.props.firebaseStorybook) {
      this.fs.copy(
        this.templatePath(".storybook/firebase.json"),
        this.destinationPath(".storybook/firebase.json")
      );
      this.fs.copyTpl(
        this.templatePath(".storybook/.firebaserc"),
        this.destinationPath(".storybook/.firebaserc"),
        {
          firebaseStorybookApp: this.props.firebaseStorybookApp
        }
      );
    }
  }

  install() {
    this.log(
      yosay(`${chalk.red("installing dependencies...")}\n${chalk.magenta("(go get a coffee)")}`)
    );
    this.installDependencies({ bower: false }).then(() => {
      this.log(
        yosay(`${chalk.green("you are all set!")}\n${chalk.yellow("Below is a list of available subgenerators:")}`)
      );
      this.log(chalk.cyan("yo react-caveman:service"));
    });
  }
};
