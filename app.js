module.exports = {
  numToGuess: function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  },
  evaluate: function(num, guess) {
    if (num < guess) {
      return "That is too low";
    } else if (num > guess) {
      return "That is too high";
    } else {
      return "BOOM!";
    }
  }
}
