const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
  describe('initialization', function(){
    it('should have a numToGuess - given no parameters', function(){
      const numberGuesser = Object.create(app).init();
      console.log(numberGuesser);
      assert.isBelow(numberGuesser.numToGuess, 11);
      assert.isAbove(numberGuesser.numToGuess, 0);
    });
    it('should have a numToGuess - within given parameters', function(){
      const numberGuesser = Object.create(app).init(5, 12);
      console.log(numberGuesser);
      assert.isBelow(numberGuesser.numToGuess, 13);
      assert.isAbove(numberGuesser.numToGuess, 4);
    });
  });
  describe('generateGuessNum()', function(){
    const numberGuesser = Object.create(app).init();
    it('should return random number within default range given no parameters', function(){
      result = numberGuesser.generateGuessNum();
      assert.isBelow(result, 11);
      assert.isAbove(result, 0);
    });
    it('should return random number below max', function(){
      result = numberGuesser.generateGuessNum(null, 4);
      assert.isBelow(result, 4);
    });
    it('should return random number >= min', function(){
      result = numberGuesser.generateGuessNum(4);
      assert.isAbove(result, 3);
    });
  });
  describe('evaluate', function(){
    const numberGuesser = Object.create(app).init();
    numberGuesser.numToGuess = 5
    it('should return “That is too high” if guess is higher than num', function(){
      result = numberGuesser.evaluate(6);
      assert.equal(result, "That is too high");
    });
    it('should return "That is too low" if guess is lower than num', function(){
      result = numberGuesser.evaluate(4);
      assert.equal(result, "That is too low");
    });
    it('should return "BOOM!" if guess is correct', function(){
      result = numberGuesser.evaluate(5);
      assert.equal(result, "BOOM!");
    });
  });
})
