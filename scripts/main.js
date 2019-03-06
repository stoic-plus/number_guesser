define(function (require) {
  const numberGuesser = require('numberGuesser');
  const dom = require('domSelectors');
  const game = Object.create(numberGuesser);
  const gameUI = require('numberGuesserUI');

  function setRangeDisplay() {
    gameUI.setRange(dom.minRangeDisplay, dom.maxRangeDisplay, game.min, game.max - 1);
  }
  dom.submitRange.addEventListener('click', () => {
    game.newGame(parseInt(dom.minRange.value), parseInt(dom.maxRange.value));
    dom.rangeForm.classList.add('removed');
    dom.gameUI.classList.remove('removed');
    setRangeDisplay();
  });
  dom.makeGuess.addEventListener('click', () => {
    const empty = gameUI.checkNoGuess(dom.guessInput);
    if (!empty) {
      try {
        const { correct_guess, eval } = game.makeGuess(parseInt(dom.guessInput.value));
        dom.feedback.classList.remove('hidden');
        gameUI.showFeedback(dom.lastGuess, game.mostRecentGuess(), dom.guessEval, eval);
        if (correct_guess) {
          gameUI.tempDisplay(dom.tempDisplay, "Correct! Range has been updated - extra ten on either side");
        }
        setRangeDisplay();
      } catch (error) {
        gameUI.tempDisplay(dom.tempDisplay, error.message);
      }
    }
  });
  dom.clearGuess.addEventListener('click', () => {
    dom.guessInput.innerText = '';
  });
  dom.reset.addEventListener('click', () => {
    dom.feedback.classList.add('hidden');
    dom.rangeForm.classList.remove('removed');
  });
})
