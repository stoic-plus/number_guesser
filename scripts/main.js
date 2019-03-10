// The "Controller" - coordinates between main game logic and view
define(function (require) {
  // all requires are saved to variables - that is used to call methods that were returned from module
  const numberGuesser = require('numberGuesser');
  const dom = require('domSelectors');
  // This is creating a new object - whose Prototype is (an object itself) the methods returned from numberGuesser file
  const game = Object.create(numberGuesser);
  const gameUI = require('numberGuesserUI');
  // click event handler - start a new game with DOM values (set state on game obj) and start a game (UI implications)
  dom.submitRange.addEventListener('click', () => {
    // dom values are strings - game takes integers
    game.newGame(parseInt(dom.minRange.value), parseInt(dom.maxRange.value));
    gameUI.startGame(game.min, game.max - 1)
  });
  // click event handler for making a guess - check if valid and update UI accordingly. Calls main game logic - coordinates with "view"
  dom.makeGuess.addEventListener('click', () => {
    // check input element - if empty
    const empty = gameUI.checkNoGuess(dom.guessInput);
    if (!empty) {
      // try, catch block - attempts some code, if not successful - executes action in catch block
      try {
        // this is called Object Destructuring. { } are used because the return from makeGuess is an object - creating two variables
         // from that returned object. Goes in order.
        const { correct_guess, eval } = game.makeGuess(parseInt(dom.guessInput.value));
        // passing values from game to view
        gameUI.showFeedback(game.mostRecentGuess(), correct_guess, eval);
        gameUI.setRange(game.min, game.max - 1);
      } catch (error) {
        gameUI.tempDisplay(error.message);
      }
    }
  });
  // clearing guess input on click
  dom.clearGuess.addEventListener('click', gameUI.clearGuess);
  // reseting game on click
    // resetGame - the value of this - is automatically set the reset button element
      // bind creates a copy of function with this set to whatever is passed in. In this case - it's set to the gameUI
  dom.reset.addEventListener('click', gameUI.resetGame.bind(gameUI));
})
