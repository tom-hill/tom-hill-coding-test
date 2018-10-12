[![codecov](https://codecov.io/gh/tom-hill/tom-hill-coding-test/branch/master/graph/badge.svg?token=TaGLEJiYup)](https://codecov.io/gh/tom-hill/tom-hill-coding-test)

# Front-end Coding Challenge

This application is the Front-end coding challenge completed for Rush. The purpose of this project is to run a single page web application that will display the lineup for a football team. This team will be auto updated when new data is pushed to it, and these changes will be reflected in the view.

----

# TODO
- Improve tests for `<TableLineup />` component
- Add keyboard navigation functionality
- Ensure WCAG Level A a11y standards
- Complete the design work

----

## Tech Stack
This application is build using React and Redux, and is tested using enzyme, mocha and chai. It is compiled and built using webpack. And can be ran from a simple node express server or a webpack dev server depending on the build mode you require.

### Redux Store
The Redux store conatins two reducers, a Global reducer and a Lineups reducer. The Global reducer contains the state for the application such as when it is loading, or if any errors have occured. The Lineup reducer contains the state for the lineups that need to be displayed.

### React Application
The React application begins in the `app.jsx` file located in the `src/components` folder. Here the main body of the application is wrapped in the provider for the afformentioned Redux store. This will render the `<Index />` component, that can be found in the folder of the same name in the same directory as `app.jsx`
The Index component is what is know as a 'Connected' or 'Smart' component. This means that it is aware of, receives data from, and dispatches actions to the Redux store. On initial render, this component renders a Loading view from the component of the same name, and once successfully mounted triggers an action to make an API call to populate the app with the initial team data.

### Debugging tools
The application has been set up to include useful tools for debugging the application. When running in Development mode (Please see the section on Running the App below), the application will have sourcemapping enabled to allow you to see the original JSX file and line numbers for the code that is causing the error. It also includes a Redux logging tool that will output the Redux actions and what occured within them to the console, and a connection to the [Redux development extension for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Code Coverage
There is a code coverage tool in place. You will see the output results of this every time you run `np run test`. It is also hooked up to codecov which allows for the publication of the code coverage report to this repo. To update the results run `npm run report-coverage`. This will automatically be ran each time you commit using the pre-commit hook.

----

## Running the App

This application can be ran in two modes. 'Production' and 'Development' modes.

Running the application in Production mode will simulate what it would be like to use the application if deployed to a live environment. It will have be running minified production ready code. To run the application in this mode, enter the command `npm run start` from the command line within the project directory.

Running the application in Development mode will allow you to extend the application or make modifications to it and to see the results in the browser in real time. This has been acheived by using a webpack-dev-server and react hot loading of components. Running the application in this mode will also run ESLint in watch mode, and the testing suite. This will allow you to gain visibility of any code styling issues (ESLint), or of any time you break part of the application code (Unit Tests). If you wish to run the application is this mode, you can run the command `nom run dev` from the command line in the project directory.

If you wanted too, you can run the Linter and Tests independtly of the full Development server. To run the linter use the command `npm run lint`, to run the test suite use the command `npm run test` 
