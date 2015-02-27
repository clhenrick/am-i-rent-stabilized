//ui no jQuery

var app = app || {};

app.ui = (function(w,d, parseAddress){
  
  // References to DOM elements
  var navGoPrev = d.querySelector('.go-prev'),
        navGoNext = d.querySelector('.go-next'),
        navGoFirst = d.querySelector('.go-first'),
        slidesContainer = d.querySelector('.slides-container'),
        slides = d.querySelectorAll('.slide'),
        currentSlide = slides[0],
        addressInput = d.querySelector('.address-input'),
        selectBoro = d.querySelector('.select-borough'),
        search = d.querySelector('.search'),
        yes = d.querySelector('.yes'),
        no = d.querySelector('.no'),
        spinnerTarget = d.querySelector('.spinner'),
        map = d.querySelector('#map'),
        mapMessage = d.querySelector('.map-message'),
        mailTo = d.getElementById('mail-to');

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
          spinner = new Spinner(spinOptsLarge).spin(spinnerTarget);
      
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
  
  // navGoPrev.addEventListener('click', function(e){
  //   goToPrevSlide();
  // });
  
  navGoNext.addEventListener('click', function(e){
    goToNextSlide();
  });
  
  // search button for address
  search.addEventListener('click', function(e){
    var streetAddress = addressInput.value,
          boro = selectBoro.value;
    checkAddressInput(streetAddress, boro);
  });

  // start over
  navGoFirst.addEventListener('click', function(e){
    goToFirstSlide();
  });

  /*
  * Helper functions
  **/

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
      for (var i=0; i < slides.length; i++) { 
        if (slides[i] === slide) { 
          index = i; 
        }        
      }
      return index;
  }

  function goToSlide(slide){
    if (!isAnimating && slide) {
      isAnimating = true;
      currentSlide = slide;
      var index = getSlideIndex(slide);
      TweenLite.to(slidesContainer, 1, {scrollTo: {y: pageHeight * index}, onComplete: onSlideChangeEnd});
    }
  }

  function goToPrevSlide(){
    if (currentSlide.previousElementSibling) {
      goToSlide(currentSlide.previousElementSibling);
    }
  }

  function goToNextSlide() {
    if (currentSlide.nextElementSibling) {
      goToSlide(currentSlide.nextElementSibling);
    }
  }

  function goToFirstSlide() {
    if (currentSlide) {
      addressInput.value = '';
      selectBoro.value = '';
      toggleMessage();
      goToSlide(slides[0]);
    }
  }

  function onSlideChangeEnd(){
    isAnimating = false;
  }

  function onResize() {
    console.log('onResize called');
    var newPageHeight = w.innerHeight;
    var slide = currentSlide;
    var index = getSlideIndex(slide);
    if (pageHeight !== newPageHeight) {
      pageHeight = newPageHeight;
      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([slidesContainer, slides], {height: pageHeight + "px"});
      //The current slide should be always on the top
      TweenLite.set(slidesContainer, {scrollTo: {y: pageHeight * index}});
    }
  }

  function toggleClass(el, className) {
    if (el.classList) {
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

  function toggleMessage(){
    toggleClass(yes, 'hidden');
    toggleClass(no, 'hidden');
  }

  function checkAddressInput(address, borough) {
    // check to make sure user filled out form correctly
    if (address !== "" && borough !== "select") {
      goToNextSlide();
      parseStreetAddress(address, borough);          
    } else if (address === "" && borough === "select") {
      alert('Please enter your address and select your borough.');
    } else if (borough === "select") {
      alert('Please select your borough.');
    } else if (address === "") {
      alert('Please enter your house number and street.');
    } else {
      return;
    };   
  }

  function parseStreetAddress(address, borough) {
    var parsedStreetAddress = parseAddress.parseLocation(address),
          streetNum = parsedStreetAddress.number;     

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
    mailTo.setAttribute('href', msg);
  }  

  function init(){
    goToSlide(currentSlide);

    if (yes.classList)
      yes.classList.add('hidden');
    else
      yes.className += ' ' + 'hidden';
  }
  
  return {
    init : init,
    toggleMessage : toggleMessage,
    goToSlide : goToSlide
  };

})(window, document, parseAddress);

window.addEventListener('DOMContentLoaded', function(){
  app.ui.init();
  app.map.initMap();
});