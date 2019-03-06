define(function (require) {
  const numberGuesser = require('numberGuesser');
  const dom = require('domSelectors');
  const game = Object.create(numberGuesser);
  const gameUI = require('numberGuesserUI');

  dom.submitRange.addEventListener('click', () => {
    game.newGame(parseInt(dom.minRange.value), parseInt(dom.maxRange.value));
    gameUI.startGame(game.min, game.max - 1)
  });
  dom.makeGuess.addEventListener('click', () => {
    const empty = gameUI.checkNoGuess(dom.guessInput);
    if (!empty) {
      try {
        const { correct_guess, eval } = game.makeGuess(parseInt(dom.guessInput.value));
        gameUI.showFeedback(game.mostRecentGuess(), correct_guess, eval);
        gameUI.setRange(game.min, game.max - 1);
      } catch (error) {
        gameUI.tempDisplay(error.message);
      }
    }
  });
  dom.clearGuess.addEventListener('click', gameUI.clearGuess);
  dom.reset.addEventListener('click', gameUI.resetGame.bind(gameUI));
})
