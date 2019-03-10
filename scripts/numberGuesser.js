// The "Model" - The Main Logic of Game

// all define(function()) are used as per the requirejs documentation to allow for modules on the client side
  // basically takes the place of module.exports
define(function() {
  // js does not have automatic return. Explicit return is required.
  return {
      // I think because all of the functions on this object are ES5 functions - this points to the object.
      // If the functions were ES6 then the functions would point to the window (not sure).
    // generateGuessNum is property (or key) on this object and the function is a key (Functions are values!?!?)
    generateGuessNum: function(){
      // returning a random number between 0 and 1 * a max - a min property on this object (requires obj to be created with these functions)
      return Math.floor(Math.random() * (this.max - this.min)) + this.min;
    },
    // function (like intialize in Ruby) to be used to assign some intial properties on a created object.
      // Has default parameters - if value is not provided then the ones specified in the parameter list are used.
    init: function(min=1, max=11) {
      this.min = min;
      this.max = max;
      this.numToGuess = this.generateGuessNum();
      this.guesses = [];
      // the created obj is returned to enable chaining methods - Object.create(app).init.doSomeStuff()
      return this;
    },
    makeGuess: function(guess) {
      // all functions must be called on this. JS does not automatically do that like in Ruby
      // pushes made guess onto guesses property
      this.guesses.push(guess);
      // error handling function
      this.checkGuess(guess);
      // guess is not correct by default
      correct_guess = false
      // conditional to increase range and set correct_guess to true if guess was correct
      if (guess === this.numToGuess) {
        this.increaseRange();
        correct_guess = true;
      }
      // returning an object with the boolean of correct_guess and a string to go along with
      return {
        correct_guess,
        eval: this.evaluate(guess)
      }
    },
    // function that updates state
    increaseRange: function() {
      this.min -= 10;
      this.max += 10;
    },
    // function that returns last element in guesses property array
    mostRecentGuess: function() {
      // returns last element as an array (of one)
      return this.guesses.slice(-1)[0];
    },
    // function with conditionals to return appropriate string based on guess
    evaluate: function(guess) {
      // comparing made guess against guess stored in state
      if (guess < this.numToGuess) {
        return "That is too low";
      } else if (guess > this.numToGuess) {
        return "That is too high";
      } else {
        return "BOOM!";
      }
    },
    // function that resets state
    newGame: function(min=1, max=11) {
      this.guesses = [];
      this.min = min;
      this.max = max;
      this.numToGuess = this.generateGuessNum();
    },
    // error handling function
    checkGuess: function(guess) {
      // Using the Number prototype method to check if guess is not integer
      if (!Number.isInteger(guess)) {
        // throw functions similar to return in that it will stop function execution (in makeGuess)
          // returning an Error Object with passed in string as message property
        throw new TypeError('Guess must be an integer');
        // using a function call inside a conditional and passing the guess
      } else if (this.outOfRange(guess)) {
        throw new RangeError('Number is outside specified range');
      }
    },
    outOfRange: function(guess) {
      // comparing made guess against max and min. (max is exclusive so max - 1 is the real limit)
      return guess > this.max - 1 || guess < this.min;
    }
  }
})
