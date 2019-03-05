define(function() {
  return {
    checkNoGuess: function(domElement) {
      if (domElement.value === '') {
        domElement.placeholder = 'You must enter a value';
        return true;
      }
    }
  }
})
