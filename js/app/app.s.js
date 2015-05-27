var app = app || {};

app.s = (function(w,d) {
  // this is for storing the app's current state

  var state = {
    formFilled : false, // has the user filled out the address form?    
    currentSlide : null, // current slide the user is on
    isAnimating : false, // if the app is animating from one slide to another
    pageHeight : null,  // slide height is set to page height minus the height of top nav bar
    yesNoState : false, // false = address not found in db, true = found
    propertyData : null // data returned from the geoclient api
  };

  app.events.subscribe('state-change', function(updates){
    if (updates.isAnimating !== undefined) state.isAnimating = updates.isAnimating;
    if (updates.formFilled !== undefined) state.formFilled = updates.formFilled;    
    if (updates.currentSlide !== undefined) state.currentSlide = updates.currentSlide;
    if (updates.pageHeight !== undefined) state.pageHeight = updates.pageHeight; 
    if (updates.yesNoState !== undefined) state.yesNoState = updates.yesNoState;
    if (updates.propertyData !== undefined) state.propertyData = updates.propertyData;    
    app.events.publish('state-updated', state);
  });

  return {
    state : state
  };

})(window, document);
