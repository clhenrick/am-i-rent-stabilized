var app = app || {};

app.l = (function(w,d,$) {
  /*
  * Event listeners
  */
  var el = app.el.el;
  var f = app.f;
  var state = app.s; // create state object
  var a = app.a; // create address searching object
  var self = this;

    // swipe interaction for mobile
  // $(document).touchwipe({
  //   wipeUp              : function()
  //   {
  //       self.goToNextSlide();
  //   },

  //   wipeDown            : function()
  //   {
  //       self.goToPrevSlide();
  //   },

  //   min_move_x          : 50,
  //   min_move_y          : 15,
  //   preventDefaultEvents: true    
  // });

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // resize window height
  w.onresize = f.onResize;

  // use mouse wheel to scroll
  addWheelListener( w, function(e) { 
    f.onMouseWheel(e.deltaY); 
    e.preventDefault(); 
  });

  // up / down key navigation
  w.onkeydown = f.onKeyDown;

  // go back
  // addEventListenerList(el.navGoPrev, 'click', goToPrevSlide);

  // go forward
  f.addEventListenerList(el.navGoNext, 'click', f.goToNextSlide);

  // go to inspect rent-history
  f.addEventListenerList(el.navGoFour, 'click', function(e){
    e.preventDefault();
    
    app.events.publish('state-change', {
      formFilled : true
    });
    
    f.hideFormValidationErrors();
    f.goToSlide(el.slides[6]);
  });

  // hamburger icon
  el.burgerIcon.addEventListener('click', function(e) {
    e.preventDefault();
    f.toggleClass(el.burgerIcon, 'open');
    f.toggleClass(el.mainNavList, 'responsive');
  });

  // if dropdown is visible & user clicks outside of it collapse it
  el.slidesContainer.addEventListener('click', function(e){
    if (f.hasClass(el.boroSelect, 'active')) {
      f.removeClass(el.boroSelect, 'active');
    }    
  });

  // search button for address
  el.search.addEventListener('click', function(e){
    e.preventDefault();
    var streetAddress = el.addressInput.value,
          boro = el.dd.val;    
    _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
    app.a.checkAddressInput(streetAddress, boro);
  });

  // start over
  f.addEventListenerList(el.navGoFirst, 'click', f.goToFirstSlide);

  // hide address error message if it's displayed and user enters text
  el.addressInput.addEventListener("blur", function(e){
    if (el.addressInput.value !== "" && f.hasClass(el.valErrorAddress, 'vis-hidden') !== true) {
      f.addClass(el.valErrorAddress, 'vis-hidden');
    }
  });

  // hide boro error message if it's displayed and user clicks a button
  f.addEventListenerList(el.boroDropDownItems, 'click', function(e){
    if (f.hasClass(el.valErrorBoro, 'vis-hidden') !== true && el.dd.getValue !== undefined) {
      f.addClass(el.valErrorBoro, 'vis-hidden');
    }
  });

  el.lightBox.addEventListener('click', function(e) {
    e.preventDefault();    
    f.goToSlide(el.slides[6]);
    w.location.hash = '';
  });  

})(window, document, jQuery);