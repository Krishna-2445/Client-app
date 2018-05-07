# Client App

## Getting Started

Note - all commands in this section need to be run from the client-app directory.

Yarn is used for dependency management to provide greater stability and prevent unwanted drift
in version numbers for JavaScript dependencies.

If you don't have Yarn on your computer yet, you'll want to install it globally using this command:
```
npm install -g yarn
```

After yarn is installed on your machine, run these two commands to install the JavaScript dependencies
and start up the Webpack Dev Server.  After running the start command, you'll see a message in the 
terminal saying "Webpack Dev Server is Fired Up!"  Shortly after this, the React app will be automatically 
opened in a new tab of your default browser.

In the future, you can skip the install command unless you've added additional dependencies.

```
yarn install
yarn start
```

## Running the tests

The Jest library is used for testing.  It will calculate code coverage and display these metrics in the 
console whenever the tests run.  Coverage results will also be available in the "client-app/dev/.jest"
directory.  When the project runs on the pipeline, all of the tests will run, and test results and 
coverage information will be available in SonarQube.

To run the tests one time, use this command:

```
yarn test
```

Jest also provides a very useful "watch mode."  Using this command will run the tests once and then 
continue watching for changes.  The tests will run again whenever a file is saved.  You can tell Jest
which tests to run by entering options in the console while watch mode is running.  More information on
this will be displayed in the console.

```
yarn test:watch
```

## Linting

Linting rules are extended from the [airbnb](https://www.npmjs.com/package/eslint-config-airbnb) linting rules.

The linter will run along with the WebPack build using eslint-loader.

If using IntelliJ, be sure to enable in Settings under ESLint.

You can also run the linter on it's own using this command.  The linter will fix easy issues on it's own, 
such as missing semi-colons, and provide a list of any other issues that need to be addressed.

```
yarn lint
```
