const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
  describe('initialization', function(){
    it('should have a numToGuess - given no parameters', function(){
      const numberGuesser = Object.create(app).init();
      assert.isBelow(numberGuesser.numToGuess, 11);
      assert.isAbove(numberGuesser.numToGuess, 0);
    });
    it('should have a numToGuess - within given parameters', function(){
      const numberGuesser = Object.create(app).init(5, 12);
      assert.isBelow(numberGuesser.numToGuess, 13);
      assert.isAbove(numberGuesser.numToGuess, 4);
    });
    it('should have an empty guesses array', function(){
      const numberGuesser = Object.create(app).init();
      assert.isEmpty(numberGuesser.guesses);
    });
  });
  describe('methods', function(){
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
    describe('makeGuess()', function(){
      it('should add a guess to guesses array', function(){
        const numberGuesser = Object.create(app).init();
        numberGuesser.makeGuess(4);
        assert.equal(numberGuesser.guesses, [4])
      });
    });
    describe('mostRecentGuess()', function(){
      const numberGuesser = Object.create(app).init();
      it('should return the only guess', function(){
        numberGuesser.guesses = [4];
        assert.equal(numberGuesser.mostRecentGuess(), 4);
      });
      it('should return the most recent guess when multiple have been made', function(){
        numberGuesser.guesses = [4, 12, 53];
        assert.equal(numberGuesser.mostRecentGuess(), 53);
      });
    });
  });
})
