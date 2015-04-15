var app = app || {};

app.s = (function(w,d) {
  // storing the app's state

  return {
    formFilled : false, // has the user filled out the address form?    
    currentSlide : null,
    isAnimating : false
  };

})(window, document);
