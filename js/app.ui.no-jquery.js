//ui no jQuery
var d = document;
var w = window;
var app = require('./app.js');
  
  // References to DOM elements
  var el = {
    // navGoPrev : d.querySelectorAll('.go-prev'),
    navGoNext : d.querySelectorAll('.go-next'),
    navGoFirst : d.querySelectorAll('.go-first'),
    navGoFour : d.querySelectorAll('.go-step4'),
    slidesContainer : d.querySelector('.slides-container'),
    slides : d.querySelectorAll('.slide'),
    slide4 : d.querySelector('#slide-8'),
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
    yesNoState : false,
    spinnerTarget : d.querySelector('.spinner'),
    map : d.getElementById('map'),
    mapMessage : d.querySelector('.map-message'),
    mailTo : d.getElementById('mail-to'),
    fbShare : d.querySelector('.fb-share-button'),    
    learnMore : d.querySelector('.button.learn-more')
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

  // go to step four
  addEventListenerList(el.navGoFour, 'click', function(e){
    e.preventDefault();
    goToSlide(el.slide4);
  });

  // search button for address
  el.search.addEventListener('click', function(e){
    e.preventDefault();
    var streetAddress = el.addressInput.value,
          boro = getBoroValue(el.selectBoro);
    // console.log('street address: ', streetAddress, ' boro: ', boro);
    _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
    checkAddressInput(streetAddress, boro);
  });

  // start over
  addEventListenerList(el.navGoFirst, 'click', goToFirstSlide);

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
    if (el.addressInput.value !== "" && hasClass(el.valErrorAddress, 'hidden') !== true) {
      addClass(el.valErrorAddress, 'hidden');
    }
    if (el.addressInput.value !== "" && hasClass(el.valErrorNF, 'hidden') !== true) {
      addClass(el.valErrorNF, 'hidden');
    }    
  });

  // hide boro error message if it's displayed and user clicks a button
  addEventListenerList(el.selectBoro, 'click', function(e) {
    if (hasClass(el.valErrorBoro, 'hidden') !== true) {
      addClass(el.valErrorBoro, 'hidden');
    }
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
      resetSearchResultMsg();      
      hideFormValidationErrors();
      resetBoroValue();
      app.map.resetMap();
      goToSlide(el.slides[0]);
    }
  }

  function onSlideChangeEnd(){
    isAnimating = false;
  }

  /*
  ** jQuery-esque helper functions
   */

   // resize window
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

  // iterate over node lists
  function iterateNodeList(list,fn) {
    if (list && list.length) {
      var i=0, len=list.length;
      for (i; i<len; i++) {
        return fn(list[i]);
      }
    }
    if (list && !list.length) {
      return fn(list);
    }
  }

  function hasClass(el, className) {
    return iterateNodeList(el, function(el){
      if (el.classList) {
        return el.classList.contains(className);
      } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }        
    });
  }

  function addClass(el, className) {
    iterateNodeList(el, function(el) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    });
  }

  function toggleClass(el, className) {
    iterateNodeList(el, function(el){
      if (el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >=0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
          el.className = classes.join(' ');
        }
      }
    });
  }

  /*
  ** User address related functions
   */

   // form validation for when user enters address and selects boro
  function checkAddressInput(address, borough) {    
    // check to make sure user filled out form correctly
    // console.log('checkAddress: ', address, borough);
    if (address !== '' && borough !== undefined) {
      goToNextSlide();
      var parsed_address = parseAddressInput(address);      
      // delay API calls so user sees loading gif
      setTimeout(function(){        
        app.map.geoclient(parsed_address[0], parsed_address[1], borough); 
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
    } 
  }

  function parseAddressInput(input) {
    var input_split = input.split(' '),
          len = input_split.length,
          num = input_split[0],
          input_last = input_split.splice(1, len),
          street = input_last.join(' ');
    return [num, street];
  }

  // create the mailto content for requesting rent history from dhcr
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

  // reset the yes / no message above map on slide 4
  function resetSearchResultMsg() {
    if (el.yesNoState === true) {
      toggleClass(el.yes, 'hidden');
      toggleClass(el.no, 'hidden');
      el.yesNoState = false;
    }
  }

  // hide all validation errors
  function hideFormValidationErrors() {
    var i=0, len=el.valErrors.length;
    for (i; i<len; i++) {
      if (hasClass(el.valErrors[i], 'hidden')===false){
        addClass(el.valErrors[i], 'hidden');
      }   
    }    
  }

  // get the value of the radio button that is checked
  function getBoroValue(radio_group) {
    for (var i = 0; i < radio_group.length; i++) {
        var button = radio_group[i];
        if (button.checked) {
            return button.value;
        }           
    }
    return undefined;    
  }

  // reset the radio buttons for select boro
  function resetBoroValue() {
    var i=0, len=el.selectBoro.length;
    for (i; i<len; i++){
      el.selectBoro[i].checked=false;
    }
  }

  // get the whole damn thing going
  function init(){
    el.currentSlide = el.slides[0];
    goToSlide(el.currentSlide);
    addClass(el.yes, 'hidden');
  }
  
  app.ui = {
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

app.ui.init();

module.exports = app.ui;

// window.addEventListener('DOMContentLoaded', function(){
//   app.ui.init();  
// });