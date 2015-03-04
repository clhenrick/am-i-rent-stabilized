//ui no jQuery

var app = app || {};

app.ui = (function(w,d, parseAddress){
  
  // References to DOM elements
  var el = {
    // navGoPrev : d.querySelectorAll('.go-prev'),
    navGoNext : d.querySelectorAll('.go-next'),
    navGoFirst : d.querySelectorAll('.go-first'),
    slidesContainer : d.querySelector('.slides-container'),
    slides : d.querySelectorAll('.slide'),
    currentSlide : null,
    addressInput : d.querySelector('.address-input'),
    // selectBoro : d.querySelector('.select-borough'),
    selectBoro : d.getElementsByName('borough'),
    search : d.querySelector('.search'),
    valErrors : d.querySelectorAll('.validation-error'),
    valErrorAddress : d.getElementById('error-address'),
    valErrorBoro : d.getElementById('error-boro'),
    valErrorNF : d.getElementById('error-not-found'),
    yes : d.querySelectorAll('.yes'),
    no : d.querySelectorAll('.no'),
    spinnerTarget : d.querySelector('.spinner'),
    map : d.getElementById('map'),
    mapMessage : d.querySelector('.map-message'),
    mailTo : d.getElementById('mail-to'),
    fbShare : d.querySelector('.fb-share-button')
  };

  // store user address 
  var parsedStreetAddress = {};

  // slide animation flag - is app animating?
  var isAnimating = false;

  // height of window
  var pageHeight = w.innerHeight;

  // key codes for up / down arrows for navigation
  var keyCodes = {
    UP : 38,
    DOWN : 40
  };

  // spinner (loading gif) presets
  var spinnerColor = '#000',  
        spinOptsLarge = {
          lines: 11, 
          length: 70, 
          width: 30, 
          radius: 70, 
          corners: 0.5, 
          rotate: 0, 
          direction: 1, 
          color: spinnerColor, 
          speed: 0.7, 
          trail: 60, 
          shadow: false, 
          hwaccel: false, 
          className: 'large', 
          zIndex: 2e9
        },
        spinOptsMed = {
            lines: 11, 
            length: 40, 
            width: 20, 
            radius: 50, 
            corners: 0.5, 
            rotate: 0, 
            direction: 1, 
            color: spinnerColor, 
            speed: 0.7, 
            trail: 60, 
            shadow: false, 
            hwaccel: false, 
            className: 'large', 
            zIndex: 2e9
          },
          spinner = new Spinner(spinOptsLarge).spin(el.spinnerTarget);
      
      if (w.width <= 600) {
        spinner.spin(spinOptsMed, spinnerColor);
      }

  /*
  * Event listeners
  */

  // resize window height
  w.onresize = onResize;
  
  // use mouse wheel to scroll
  addWheelListener( w, function(e) { 
    onMouseWheel(e.deltaY); 
    e.preventDefault(); 
  });
  
  // up / down key navigation
  w.onkeydown = onKeyDown;
  
  // go back
  // addEventListenerList(el.navGoPrev, 'click', goToPrevSlide);
  
  // go forward
  addEventListenerList(el.navGoNext, 'click', goToNextSlide);

  // search button for address
  el.search.addEventListener('click', function(e){
    e.preventDefault();
    var streetAddress = el.addressInput.value,
          boro = getBoroValue(el.selectBoro);
    console.log('street address: ', streetAddress, ' boro: ', boro);
    checkAddressInput(streetAddress, boro);
  });

  // start over
  addEventListenerList(el.navGoFirst, 'click', goToFirstSlide);

  addEventListener(el.fbShare, 'click', function(e) {
    e.preventDefault();
    FB.ui({
      method : 'feed',
      name : 'Am I Rent Stabilized?',
      link : 'http://amirentstabilized.com',
      picture: 'assets/png/no1.png',
      description: 'Find out if your land lord might owe you money!',
      message : ''
    });
  });

  /*
  * Helper functions
  **/

  function addEventListenerList(list, event, fn) {
    var i=0, len=list.length;
    for (i; i< len; i++) {
        list[i].addEventListener(event, fn, false);
    }
  }

  function onKeyDown(event){
    var pressedKey = event.keyCode;
    if (pressedKey === keyCodes.UP) {
      goToPrevSlide();
      event.preventDefault();
    } 
    else if (pressedKey === keyCodes.DOWN) {
      goToNextSlide();
      event.preventDefault();
    }
  }

  function onMouseWheel(event) {
    var delta = event / 30 || -event;    
    if (delta < -1) {
      goToNextSlide();
    }
    else if (delta > 1) {
      goToPrevSlide();
    } 
  }

  function getSlideIndex(slide){
      var index;
      for (var i=0; i < el.slides.length; i++) { 
        if (el.slides[i] === slide) { 
          index = i; 
        }        
      }
      return index;
  }

  function goToSlide(slide){
    if (!isAnimating && slide) {
      isAnimating = true;
      el.currentSlide = slide;
      var index = getSlideIndex(slide);
      TweenLite.to(el.slidesContainer, 1, {scrollTo: {y: pageHeight * index}, onComplete: onSlideChangeEnd});
    }
  }

  function goToPrevSlide(callback){
    if (el.currentSlide.previousElementSibling) {      
      goToSlide(el.currentSlide.previousElementSibling);      
      if (callback && typeof callback === "function") { 
        callback();
        console.log('goToPrevSlide callback called.');
      }
    }    
  }

  function goToNextSlide(callback) {
    if (el.currentSlide.nextElementSibling) {      
      goToSlide(el.currentSlide.nextElementSibling);
      console.log('go to next slide called');      
      if (callback && typeof callback === "function") { 
        callback(); 
        console.log('goToNextSlide callback called.');
      }  
    }      
  }

  function goToFirstSlide() {
    // reset everything to defaults
    if (el.currentSlide) {
      el.addressInput.value = '';
      el.selectBoro.value = 'select';
      toggleMessage();
      hideFormValidationErrors();
      resetBoroValue();
      goToSlide(el.slides[0]);
    }
  }

  function onSlideChangeEnd(){
    isAnimating = false;
  }

  /*
  ** jQuery-esque functions
   */

  function onResize() {
    // console.log('onResize called');
    var newPageHeight = w.innerHeight;
    var slide = el.currentSlide;
    var index = getSlideIndex(slide);
    if (pageHeight !== newPageHeight) {
      pageHeight = newPageHeight;
      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([el.slidesContainer, el.slides], {height: pageHeight + "px"});
      //The current slide should be always on the top
      TweenLite.set(el.slidesContainer, {scrollTo: {y: pageHeight * index}});
    }
  }

  function hasClass(el, className) {
    if (el && el.length) {
      var i=0, len=el.length;
      for (i; i<len; i++) {
        if (el[i].classList)
          return el[i].classList.contains(className);
        else
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el[i].className);        
      }
    }
    if (el && el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  function addClass(el, className) {
    if (el && el.length){
      var i=0, len=el.length;
      for (i; i<len; i++) {
        if (el[i].classList) {
          el[i].classList.add(className);
        } else {
          el[i].className += ' ' + className;
        }
      }
    } else {
      if (el && el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }      
    }
  }

  function toggleClass(el, className) {    
    if (el &&  el.length){
      var i=0; len=el.length;
      for (i; i<len; i++) {
        if (el[i].classList) {
            el[i].classList.toggle(className);
          } else {
            var classes = el[i].className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
              classes.splice(existingIndex, 1);
            else
              classes.push(className);
            el[i].className = classes.join(' ');
          }
      }
    } else {
      if (el && el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);
        el.className = classes.join(' ');
      }
    }
  }

  /*
  ** User address related functions
   */

  function checkAddressInput(address, borough) {    
    // check to make sure user filled out form correctly
    console.log('checkAddress: ', address, borough);
    if (address !== '' && borough !== undefined) {
      goToNextSlide();
      // delay API calls so user sees loading gif
      setTimeout(function(){
        parseStreetAddress(address, borough);
      }, 1000);              
    } else if (address === '' && borough === undefined) {
      // alert('Please enter your address and select your borough.');
      if (hasClass(el.valErrorAddress, 'hidden')===true && hasClass(el.valErrorBoro, 'hidden')===true){
        toggleClass(el.valErrorAddress, 'hidden');
        toggleClass(el.valErrorBoro, 'hidden');
      }
    } else if (borough === undefined) {
      // alert('Please select your borough.');
      if (hasClass(el.valErrorBoro, 'hidden')===true) {
        toggleClass(el.valErrorBoro, 'hidden');
      }
    } else if (address === '') {
      // alert('Please enter your house number and street.');
      if (hasClass(el.valErrorAddress, 'hidden')===true) {
        toggleClass(el.valErrorAddress, 'hidden');
      }
    } else {
      goToPrevSlide();
    };   
  }

  function parseStreetAddress(address, borough) {
    var parsedStreetAddress = parseAddress.parseLocation(address),
          streetNum = parsedStreetAddress.number;  
    // console.log('parsed address: ', streetNum, ' ', parsedStreetAddress);   
    if (parsedStreetAddress.type && !parsedStreetAddress.prefix) { 
      streetAddress = parsedStreetAddress.street + ' ' + parsedStreetAddress.type;
    } else if (parsedStreetAddress.type && parsedStreetAddress.prefix) {
      streetAddress = parsedStreetAddress.prefix + ' ' +
                                parsedStreetAddress.street + ' ' + 
                                parsedStreetAddress.type;         
    } else if (parsedStreetAddress.prefix && !parsedStreetAddress.type) {      
      streetAddress = parsedStreetAddress.prefix + ' ' +
                                parsedStreetAddress.street;      
    } else {
      streetAddress = parsedStreetAddress.street;
    };
    app.map.geoclient(streetNum, streetAddress, borough);    
  } 

  // creates the mail to for requesting rent history
  function createMailTo(address) {
    var email = "rentinfo@nyshcr.org",
          subject = "request for rent history",
          body = "Hello, \n\n" +
                      "I, <YOUR NAME HERE>, am currently renting " + 
                      "<YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE>" +
                      " and would like the rent history for the apartment I am renting." +
                      " Any information you can provide me would be greatly appreciated. \n\n" +
                      "thank you,\n\n" +
                      "- <YOUR NAME HERE>",
          msg = 'mailto:' + encodeURIComponent(email) +
                     '?subject=' + encodeURIComponent(subject) +
                     '&body=' + encodeURIComponent(body); 
    el.mailTo.setAttribute('href', msg);
  } 

  // toggle yes / no message
  function toggleMessage(){
    toggleClass(el.yes, 'hidden');
    toggleClass(el.no, 'hidden');
  }

  function hideFormValidationErrors() {
    var i=0, len=el.valErrors.length;
    for (i; i<len; i++) {
      if (hasClass(el.valErrors[i], 'hidden')===false){
        addClass(el.valErrors[i], 'hidden');
      }   
    }    
  }

  function getBoroValue(radio_group) {
    for (var i = 0; i < radio_group.length; i++) {
        var button = radio_group[i];
        if (button.checked) {
            return button.value;
        }           
    }
    return undefined;    
  }

  function resetBoroValue() {
    var i=0, len=el.selectBoro.length;
    for (i; i<len; i++){
      el.selectBoro[i].checked=false;
    }
  }

  function init(){
    el.currentSlide = el.slides[0];
    goToSlide(el.currentSlide);
    addClass(el.yes, 'hidden');
    app.map.init();
  }
  
  return {
    init : init,
    el : el,    
    f : {
      goToSlide: goToSlide,
      goToPrevSlide : goToPrevSlide,
      goToNextSlide : goToNextSlide,      
      toggleClass : toggleClass,
      hasClass : hasClass,
      addClass : addClass,
      resetBoroValue : resetBoroValue
    }
  };

})(window, document, parseAddress);

window.addEventListener('DOMContentLoaded', function(){
  app.ui.init();  
});