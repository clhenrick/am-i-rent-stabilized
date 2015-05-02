var app = app || {};

app.s = (function(w,d) {
  // this is for storing the app's current state

  var state = {
    formFilled : false, // has the user filled out the address form?    
    currentSlide : null,
    isAnimating : false,
    pageHeight : null,
    yesNoState : false,
    propertyData : null
  };

  app.events.subscribe('state-change', function(updates){
    
    if (updates.isAnimating !== undefined) state.isAnimating = updates.isAnimating;
    if (updates.formFilled !== undefined) state.formFilled = updates.formFilled;    
    if (updates.currentSlide !== undefined) state.currentSlide = updates.currentSlide;
    if (updates.pageHeight !== undefined) state.pageHeight = updates.pageHeight; 
    if (updates.yesNoState !== undefined) state.yesNoState = updates.yesNoState;
    if (updates.propertyData !== undefined) state.propertyData = updates.propertyData;
    
    // console.log('state: ', state);

    app.events.publish('state-updated', state);
  });

  return {
    state : state
  };

})(window, document);
