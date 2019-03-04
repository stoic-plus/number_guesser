module.exports = {
  generateGuessNum: function(min=1, max=11){
    return Math.floor(Math.random() * (max - min)) + min;
  },
  init: function(min=1, max=11) {
    this.numToGuess = this.generateGuessNum(min, max);
    console.log(this.numToGuess);
    return this;
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
