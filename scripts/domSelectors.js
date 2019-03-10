define(function() {
  // this module is used to dry up code, so these selectors are not repeated.
  return {
    // getElementById is called on the document and takes an id to find an elementy by
      // returns the element itself. Well kind of (Virtual DOM - an object that represents the DOM)
    guessInput: document.getElementById('guess-input'),
    makeGuess: document.getElementById('make-guess'),
    clearGuess: document.getElementById('clear-guess'),
    feedback: document.getElementById('feedback'),
    lastGuess: document.getElementById('guess-last'),
    guessEval: document.getElementById('guess-evaluate'),
    reset: document.getElementById('reset'),
    rangeForm: document.getElementById('range-form'),
    minRange: document.getElementById('min-range'),
    maxRange: document.getElementById('max-range'),
    submitRange: document.getElementById('range-submit'),
    gameUI: document.getElementById('gameUI'),
    minRangeDisplay: document.getElementById('min-range-display'),
    maxRangeDisplay: document.getElementById('max-range-display'),
    tempDisplay: document.getElementById('temp-display')
  }
})
