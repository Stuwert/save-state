# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The goal of this project is to build a few different skills in areas that I don't have much experience with by building out a small game prototype. The game is draughts or Tic-Tac-Toe and the goal is to create a state parameter by which the game can be shared and replayed by different people via a share link. 

### Technologies Used
- Tailwind CSS
- Create React App
- Typescript
- Xstate

## Requirements

- This should be fault tolerant, if the game is given an incorrect series of commands to start, it should error
- The game should be playable by either two people or by one player and an "AI"
- The game should have arbitrary start conditions. It should be able to accept multiple different potential draughts starting positions
- 


## TODO:

- [] Set up tests for components
    - [] Figure out which test set up this uses
    - [] Figure out how to validate that stuff exists in the component
    - [] Write some tests
- [x] Set up tests for the game states
    - [x] Figure out how the state machine set up works
    - [x] Get test functioning for drought tile
    - [] get test functioning for parent game state
- [] The game should display the current players turn
- [] After one player takes their turn the game state should change whose turn it is
- [] X-state machine should use types

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
