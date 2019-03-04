module.exports = {
  generateGuessNum: function(min=1, max=11){
    return Math.floor(Math.random() * (max - min)) + min;
  },
  init: function(min=1, max=11) {
    this.min = min;
    this.max = max;
    this.numToGuess = this.generateGuessNum(min, max);
    this.guesses = [];
    return this;
  },
  makeGuess: function(guess) {
    this.guesses.push(guess);
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
  }
}
