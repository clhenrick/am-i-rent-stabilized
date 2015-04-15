var app = app || {};

app.l = (function(w,d) {
  /*
  * Event listeners
  */
  var el = app.el;
  var f = app.f;
  var state = app.s; // create state object
  var a = app.a; // create address searching object

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
    state.formFilled = true;
    f.hideFormValidationErrors();
    f.goToSlide(el.slides[6]);
  });

  // hamburger icon
  el.burgerIcon.addEventListener('click', function(e) {
    e.preventDefault();
    f.toggleClass(el.burgerIcon, 'open');
    f.toggleClass(el.mainNavList, 'responsive');
  });

  // drop down for borough
  // addEventListenerList(el.boroSelect, 'click', function(e){
  //   e.preventDefault();    
  //   addClass(el.boroDropDown, 'active');
  // });

  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li');
    this.val = undefined;    
    this.index = -1;
    this.initEvents();
  }

  DropDown.prototype = {
    initEvents : function() {
      var obj = this;

      // console.log('initEvents this: ', this);

      obj.dd.on('click', function(e){
        e.preventDefault();
        // $(this).toggleClass('active');
        toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.val);        
        // console.log('obj: ', obj);  
      });
    },

    getValue : function() {
      return this.val;
    },

    getIndex : function() {
      return this.index;
    }
  };

  el.dd = new DropDown( $('.user-data.borough-select') );

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
          boro = dd.val;    
    _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
    a.checkAddressInput(streetAddress, boro);
  });

  // start over
  f.addEventListenerList(el.navGoFirst, 'click', f.goToFirstSlide);

  // add data to facebook button
  // addEventListenerList(el.fbShare, 'click', function(e) {
  //   e.preventDefault();
  //   FB.ui({
  //     method : 'feed',
  //     name : 'Am I Rent Stabilized?',
  //     link : 'http://amirentstabilized.com',
  //     picture: 'assets/png/no1.png',
  //     description: 'Find out if your land lord might owe you money!',
  //     message : ''
  //   });
  // });

  // hide address error message if it's displayed and user enters text
  el.addressInput.addEventListener("blur", function(e){
    if (el.addressInput.value !== "" && f.hasClass(el.valErrorAddress, 'vis-hidden') !== true) {
      f.addClass(el.valErrorAddress, 'vis-hidden');
    }
  });

  // hide boro error message if it's displayed and user clicks a button
  f.addEventListenerList(el.boroDropDownItems, 'click', function(e){
    if (f.hasClass(el.valErrorBoro, 'vis-hidden') !== true && dd.getValue !== undefined) {
      f.addClass(el.valErrorBoro, 'vis-hidden');
    }
  });

  el.lightBox.addEventListener('click', function(e) {
    e.preventDefault();    
    f.goToSlide(el.slides[6]);
    w.location.hash = '';
  });  
})(window, document);