var app = app || {};

app.l = (function(w,d,$,el,f) {
  /*
  * Event listeners
  */

  // var el = app.elem;
  // var f = app.fns;
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

  function listen() {
    app.events.subscribe('state-updated', function(updatedState){
      state = updatedState;
    });

    // resize window height
    w.onresize = app.f.onResize;

    // use mouse wheel to scroll
    addWheelListener( w, function(e) { 
      app.f.onMouseWheel(e.deltaY); 
      e.preventDefault(); 
    });

    // up / down key navigation
    w.onkeydown = app.f.onKeyDown;

    // go back
    // addEventListenerList(el.navGoPrev, 'click', goToPrevSlide);

    // go forward
    app.f.addEventListenerList(app.el.navGoNext, 'click', app.f.goToNextSlide);

    // go to inspect rent-history
    app.f.addEventListenerList(app.el.navGoFour, 'click', function(e){
      e.preventDefault();
      
      app.events.publish('state-change', {
        formFilled : true
      });
      
      app.f.hideFormValidationErrors();
      app.f.goToSlide(app.el.slides[6]);
    });

    // hamburger icon
    app.el.burgerIcon.addEventListener('click', function(e) {
      e.preventDefault();
      app.f.toggleClass(app.el.burgerIcon, 'open');
      app.f.toggleClass(app.el.mainNavList, 'responsive');
    });

    // if dropdown is visible & user clicks outside of it collapse it
    app.el.slidesContainer.addEventListener('click', function(e){
      if (app.f.hasClass(app.el.boroSelect, 'active')) {
        app.f.removeClass(app.el.boroSelect, 'active');
      }    
    });

    // search button for address
    app.el.search.addEventListener('click', function(e){
      e.preventDefault();
      var streetAddress = app.el.addressInput.value,
            boro = app.el.dd.getValue();    
      _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
      app.a.checkAddressInput(streetAddress, boro);
    });

    // start over
    app.f.addEventListenerList(app.el.navGoFirst, 'click', app.f.goToFirstSlide);

    // hide address error message if it's displayed and user enters text
    app.el.addressInput.addEventListener("blur", function(e){
      if (app.el.addressInput.value !== "" && app.f.hasClass(app.el.valErrorAddress, 'vis-hidden') !== true) {
        app.f.addClass(app.el.valErrorAddress, 'vis-hidden');
      }
    });

    // hide boro error message if it's displayed and user clicks a button
    app.f.addEventListenerList(app.el.boroDropDownItems, 'click', function(e){
      if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden') !== true && app.el.dd.getValue !== undefined) {
        app.f.addClass(app.el.valErrorBoro, 'vis-hidden');
      }
    });

    app.el.lightBox.addEventListener('click', function(e) {
      e.preventDefault();    
      app.f.goToSlide(app.el.slides[6]);
      w.location.hash = '';
    });  

    // el.trModal.addEventListener('click', function(e) {
    //   e.preventDefault();
    //   f.goToSlide(el.slides[7]);
    //   w.location.hash = '';
    // });
  }

  return {
    listen : listen
  };

})(window, document, jQuery, app.el, app.f);