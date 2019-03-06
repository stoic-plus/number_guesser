define(function() {
  return {
    generateGuessNum: function(){
      return Math.floor(Math.random() * (this.max - this.min)) + this.min;
    },
    init: function(min=1, max=11) {
      this.min = min;
      this.max = max;
      this.numToGuess = this.generateGuessNum();
      this.guesses = [];
      return this;
    },
    makeGuess: function(guess) {
      this.guesses.push(guess);
      this.checkGuess(guess);
      correct_guess = false
      if (guess === this.numToGuess) {
        this.increaseRange();
        correct_guess = true;
      }
      return {
        correct_guess,
        eval: this.evaluate(guess)
      }
    },
    increaseRange: function() {
      this.min -= 10;
      this.max += 10;
    },
    mostRecentGuess: function() {
      return this.guesses.slice(-1)[0];
    },
    evaluate: function(guess) {
      if (guess < this.numToGuess) {
        return "That is too low";
      } else if (guess > this.numToGuess) {
        return "That is too high";
      } else {
        return "BOOM!";
      }
    },
    newGame: function(min=1, max=11) {
      this.guesses = [];
      this.min = min;
      this.max = max;
      this.numToGuess = this.generateGuessNum();
    },
    checkGuess: function(guess) {
      if (!Number.isInteger(guess)) {
        throw new TypeError('Guess must be an integer');
      } else if (this.outOfRange(guess)) {
        throw new RangeError('Number is outside specified range');
      }
    },
    outOfRange: function(guess) {
      return guess > this.max - 1 || guess < this.min;
    }
  }
})
