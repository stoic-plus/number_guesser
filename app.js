module.exports = {
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
    if (guess === this.numToGuess) {
      this.increaseRange();
    }
    return this.evaluate(guess);
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
  reset: function() {
    this.guesses = [];
    this.numToGuess = this.generateGuessNum();
  },
  outOfRange?(guess) {
    return guess > this.max || guess < this.min;
  }
}
