const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
  describe('numToGuess()', function(){
    it('should return random number below max', function(){
      result = app.numToGuess(1, 4);
      assert.isBelow(result, 4);
    });
    it('should return random number >= min', function(){
      result = app.numToGuess(1, 4);
      assert.isAbove(result, 0);
    });
  });
  describe('evaluate', function(){
    numToGuess = 5
    it('should return “That is too high” if guess is higher than num', function(){
      result = app.evaluate(6);
      assert.equal(result, "That is too high");
    });
    it('should return "That is too low" if guess is lower than num', function(){
      result = app.evaluate(4);
      assert.equal(result, "That is too low");
    });
    it('should return "BOOM!" if guess is correct', function(){
      result = app.evaluate(5);
      assert.equal(result, "BOOM!");
    });
  });
})
