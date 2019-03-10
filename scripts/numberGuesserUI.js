// The "View"

define(function() {
  // importing the DOM selectors module (looking inside /scripts by default)
  const dom = require('domSelectors');
  return {
    // function that takes a domElement and changes its placeholder attribute
    checkNoGuess: function(domElement) {
      if (domElement.value === '') {
        domElement.placeholder = 'You must enter a value';
        return true;
      }
    },
    // function that takes a message and temporarily changes dom element's inner text and changes classList
    tempDisplay: function(message) {
      // classList is just that. The classes on some dom element - removing 'hidden' to show it
      dom.tempDisplay.classList.remove('hidden');
      // changing inner text to be message
      dom.tempDisplay.innerText = message;
      // setTimeout web API to asynchronously change the inner text back and make element hidden again
      window.setTimeout(() => {
        // do this stuff
        dom.tempDisplay.innerText = '';
        dom.tempDisplay.classList.add('hidden');
        // after waiting 3 seconds
      }, 3000);
    },
    // function that changes classList on two dom elements and calls other functions
    startGame: function(min, max) {
      // removing form for setting ranges
      dom.rangeForm.classList.add('removed');
      // clearing it's inputs
      this.clearRangeForm();
      // showing gameUI (guess input and buttons)
      dom.gameUI.classList.remove('removed');
      // setting the range for the game from the range form
      this.setRange(min, max);
    },
    // 'resets' game
    resetGame: function() {
      // clears gameUI input a p tags
      this.clearGameUI();
      // removing gameUI and adding range form to DOM
      dom.gameUI.classList.add('removed');
      dom.rangeForm.classList.remove('removed');
    },
    // clearing DOM values
    clearRangeForm: function() {
      dom.minRange.value = '';
      dom.maxRange.value = '';
    },
    // clearing DOM values
    clearGameUI: function() {
      dom.guessInput.value = '';
      dom.lastGuess.innerText = '';
      dom.guessEval.innerText = '';
    },
    // clearing guess input and changing styling of button to clearGuess (already cleared)
    clearGuess: function() {
      dom.guessInput.value = '';
      dom.clearGuess.classList.add('disabled');
    },
    // updates GameUI with the made guess and whether it was successful
    showFeedback: function(lastGuess, correct_guess, feedback) {
      // a guess was made - so clear guess button has something to clear
      dom.clearGuess.classList.remove('disabled');
      dom.lastGuess.innerText = lastGuess;
      dom.guessEval.innerText = feedback;
      // if correct guess - show explanation about updating range (temporarily)
      if (correct_guess) {
        this.tempDisplay("Correct! Range has been updated - extra ten on either side");
      }
    },
    // setting the range the user chose to the DOM
    setRange: function(min, max) {
      dom.minRangeDisplay.innerText = min;
      dom.maxRangeDisplay.innerText = max;
    }
  }
})
