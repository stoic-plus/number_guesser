define(function() {
  return {
    checkNoGuess: function(domElement) {
      if (domElement.value === '') {
        domElement.placeholder = 'You must enter a value';
        return true;
      }
    },
    tempDisplay: function(domElement, message) {
      domElement.classList.remove('hidden');
      domElement.innerText = message;
      window.setTimeout(() => {
        domElement.innerText = '';
        domElement.classList.add('hidden');
      }, 3000);
    },
    showFeedback: function(lastGuessDom, lastGuess, feedbackDom, feedback) {
      lastGuessDom.innerText = lastGuess;
      feedbackDom.innerText = feedback;
    },
    setRange: function(minDom, maxDom, min, max) {
      minDom.innerText = min;
      maxDom.innerText = max;
    }
  }
})
