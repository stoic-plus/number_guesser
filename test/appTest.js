const chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
const should = chai.should(), expect = chai.expect, assert = chai.assert;
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
    it('should have a default min and max', function(){
      const numberGuesser = Object.create(app).init();
      assert.equal(numberGuesser.min, 1);
      assert.equal(numberGuesser.max, 11);
    });
    it('should take a custom min and max', function(){
      const numberGuesser = Object.create(app).init(10, 20);
      assert.equal(numberGuesser.min, 10);
      assert.equal(numberGuesser.max, 20);
    });
  });
  describe('methods', function(){
    describe('generateGuessNum()', function(){
      const numberGuesser = Object.create(app).init();
      it('should return random number within default range', function(){
        result = numberGuesser.generateGuessNum();
        assert.isBelow(result, 11);
        assert.isAbove(result, 0);
      });
      it('should return random number below max', function(){
        numberGuesser.max = 4;
        result = numberGuesser.generateGuessNum();
        assert.isBelow(result, 4);
      });
      it('should return random number >= min', function(){
        numberGuesser.min = 4
        result = numberGuesser.generateGuessNum();
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
      const numberGuesser = Object.create(app).init(10, 20);
      numberGuesser.numToGuess = 15;
      it('should add a guess to guesses array', function(){
        numberGuesser.makeGuess(14);
        assert.deepEqual(numberGuesser.guesses, [14])
      });
      it('should call evaluate with guess', function(){
        const spy = chai.spy.on(numberGuesser, 'evaluate');
        evaluation = numberGuesser.makeGuess(14);
        assert.equal(evaluation, "That is too low");
        expect(spy).to.have.been.called.with(14);
        chai.spy.restore();
      });
      it('should increase range when guess is correct', function(){
        assert.equal(numberGuesser.min, 10);
        assert.equal(numberGuesser.max, 20);

        const spy = chai.spy.on(numberGuesser, 'increaseRange');
        evaluation = numberGuesser.makeGuess(15);

        assert.equal(evaluation, "BOOM!");
        assert.equal(numberGuesser.min, 0);
        assert.equal(numberGuesser.max, 30);
        expect(spy).to.have.been.called();
        chai.spy.restore();
      });
      it('should throw a RangeError if guess is out of range', function(){
        numberGuesser.min = 10;
        numberGuesser.max = 20;
        assert.throws(numberGuesser.makeGuess.bind(numberGuesser, 5), RangeError, 'Number is outside specified range');
        assert.throws(numberGuesser.makeGuess.bind(numberGuesser, 22), RangeError, 'Number is outside specified range');
      });
      it('should throw a TypeError if guess is not a number', function(){
        assert.throws(numberGuesser.makeGuess.bind(numberGuesser, '12'), TypeError, 'Guess must be an integer');
      });
    });
    describe('increaseRange()', function(){
      it('decreases min by 10 and increases max by 10', function(){
        const numberGuesser = Object.create(app).init(5, 10);
        numberGuesser.increaseRange();
        assert.equal(numberGuesser.min, -5);
        assert.equal(numberGuesser.max, 20);
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
    describe('reset()', function(){
      const numberGuesser = Object.create(app).init();
      it('should reset guesses', function(){
        numberGuesser.guesses = [23, 553, 12];
        numberGuesser.reset();
        assert.isEmpty(numberGuesser.guesses);
      });
      it('should choose a new numToGuess', function(){
        numberGuesser.numToGuess = 12;
        numberGuesser.min = 5
        numberGuesser.max = 10
        numberGuesser.reset();
        assert.notEqual(numberGuesser.numToGuess, 12);
      });
    });
  });
})
