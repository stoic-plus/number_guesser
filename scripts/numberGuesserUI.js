define(function() {
  const dom = require('domSelectors');
  return {
    checkNoGuess: function(domElement) {
      if (domElement.value === '') {
        domElement.placeholder = 'You must enter a value';
        return true;
      }
    },
    tempDisplay: function(message) {
      dom.tempDisplay.classList.remove('hidden');
      dom.tempDisplay.innerText = message;
      window.setTimeout(() => {
        dom.tempDisplay.innerText = '';
        dom.tempDisplay.classList.add('hidden');
      }, 3000);
    },
    startGame: function(min, max) {
      dom.rangeForm.classList.add('removed');
      this.clearRangeForm();
      dom.gameUI.classList.remove('removed');
      this.setRange(min, max);
    },
    resetGame: function() {
      this.clearGameUI();
      dom.gameUI.classList.add('removed');
      dom.rangeForm.classList.remove('removed');
    },
    clearRangeForm: function() {
      dom.minRange.value = '';
      dom.maxRange.value = '';
    },
    clearGameUI: function() {
      dom.guessInput.value = '';
      dom.lastGuess.innerText = '';
      dom.guessEval.innerText = '';
    },
    clearGuess: function() {
      dom.guessInput.value = '';
      dom.clearGuess.classList.add('disabled');
    },
    showFeedback: function(lastGuess, correct_guess, feedback) {
      dom.clearGuess.classList.remove('disabled');
      dom.lastGuess.innerText = lastGuess;
      dom.guessEval.innerText = feedback;
      if (correct_guess) {
        this.tempDisplay("Correct! Range has been updated - extra ten on either side");
      }
    },
    setRange: function(min, max) {
      dom.minRangeDisplay.innerText = min;
      dom.maxRangeDisplay.innerText = max;
    }
  }
})
