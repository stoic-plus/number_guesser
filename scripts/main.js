define(function (require) {
  const numberGuesser = require('numberGuesser');
  const dom = require('domSelectors');
  const game = Object.create(numberGuesser).init();
  const gameUI = require('numberGuesserUI');

  dom.makeGuess.addEventListener('click', () => {
    const empty = gameUI.checkNoGuess(dom.guessInput);
    if (!empty) {
      const eval = game.makeGuess(parseInt(dom.guessInput.value));
      console.log(eval);
    }
  });
})
