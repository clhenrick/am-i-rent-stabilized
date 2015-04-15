var app = app || {};

app.f = (function(w,d) {
  
  var el = app.el.el;
  var state = app.s;

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // slide animation flag - is app animating?
  // state.isAnimating = false;

  // height of window
  // var pageHeight = w.innerHeight;

  // key codes for up / down arrows for navigation
  var keyCodes = {
    UP : 38,
    DOWN : 40
  };  

  return {
    addEventListenerList : function (list, event, fn) {
      var i=0, len=list.length;
      for (i; i< len; i++) {
          list[i].addEventListener(event, fn, false);
      }
    },

    onKeyDown : function (event){
      var pressedKey = event.keyCode;
      if (pressedKey === keyCodes.UP) {
        app.f.goToPrevSlide();
        event.preventDefault();
      } 
      else if (pressedKey === keyCodes.DOWN) {
        app.f.goToNextSlide();
        event.preventDefault();
      }
    },

    onMouseWheel : function(event) {
      var delta = event / 30 || -event;    
      if (delta < -1) {
        app.f.goToNextSlide();
      }
      else if (delta > 1) {
        app.f.goToPrevSlide();
      } 
    },

    getSlideIndex : function(slide){
        var index;
        for (var i=0; i < el.slides.length; i++) { 
          if (el.slides[i] === slide) { 
            index = i; 
          }        
        }
        return index;
    },

    goToSlide : function(slide){
      if (!state.isAnimating && slide) {

        app.events.publish('state-change', {
          isAnimating : true,
          currentSlide : slide
        });

        var index = app.f.getSlideIndex(slide);                  
        TweenLite.to(el.slidesContainer, 1, {scrollTo: {y: state.pageHeight * index}, onComplete: app.f.onSlideChangeEnd});
      }
    },

    goToPrevSlide : function(callback){          
      var previous = app.f.getSlideIndex(state.currentSlide) -1;
      console.log('go previous slide', previous);
      if (previous >=0) {      
        app.f.goToSlide(el.slides[previous]);       
        if (callback && typeof callback === "function") { 
          callback();
          // console.log('goToPrevSlide callback called.');
        }
      }    
    },

    goToNextSlide: function(callback) {
      // console.log('local slide state: ', state);
      var index = app.f.getSlideIndex(state.currentSlide);
      var next = el.slides[index + 1];
      // console.log('go to next slide', state);
      // console.log('formFilled: ', state.formFilled, ' index: ', index);
      if (next && ( index === 0 || (index >= 1 && state.formFilled === true ) ) ) {      
        app.f.goToSlide(next);
        if (callback && typeof callback === "function") { 
          callback(); 
          // console.log('goToNextSlide callback called.');
        }  
      }      
    },

    goToFirstSlide : function() {
      // reset everything to defaults
      if (state.currentSlide) {
        el.addressInput.value = '';
        app.f.resetSearchResultMsg();      
        app.f.hideFormValidationErrors();
        app.f.resetBoroValue();
        app.map.resetMap();
        app.f.addClass(el.yes, 'hidden');
        app.f.removeClass(el.no, 'hidden');      
        app.f.goToSlide(el.slides[0]);
        app.events.publish('state-change', {
          formFilled : false
        });
      }
    },

    onSlideChangeEnd : function(){
      app.events.publish('state-change', {
        isAnimating : false
      });      
      app.f.updateProgCircles(state.currentSlide);
    },

    updateProgCircles : function (slide) {
      var s = app.f.getSlideIndex(slide),
            i = 0,
            l = el.progressCircles.length;
      
      for (i; i<l; i++) {
        var circle = el.progressCircles[i];
        if (s===i) {
          circle.style.backgroundImage = 'url(assets/png/oval_25_filled.png)';
          circle.style.backgroundSize = '25px';
          circle.style.backgroundRepeat = 'no-repeat';        
        } else {
          circle.style.background = 'url(assets/png/oval_25_blank.png)';
          circle.style.backgroundSize = '25px';
          circle.style.backgroundRepeat = 'no-repeat';               
        }
      }
    },

    /*
    ** jQuery-esque helper functions
     */

     // resize window
    onResize : function() {
      // console.log('onResize called');
      var newPageHeight = w.innerHeight;
      var slide = state.currentSlide;
      var index = app.f.getSlideIndex(slide);
      if (state.pageHeight !== newPageHeight) {
        app.events.publish('state-change', { pageHeight : newPageHeight });
        //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
        TweenLite.set([el.slidesContainer, el.slides], {height: state.pageHeight + "px"});
        //The current slide should be always on the top
        TweenLite.set(el.slidesContainer, {scrollTo: {y: state.pageHeight * index}});
      }
    },

    // iterate over node lists
    iterateNodeList : function(list,fn) {
      if (list && list.length) {
        var i=0, len=list.length;
        for (i; i<len; i++) {
          return fn(list[i], i);
        }
      }
      if (list && !list.length) {
        return fn(list);
      }
    },

    indexOf : function(array, item) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === item)
          return i;
      }
      return -1;
    },  
    
    hasClass : function(el, className) {
      return app.f.iterateNodeList(el, function(el){
        if (el.classList) {
          return el.classList.contains(className);
        } else {
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }        
      });
    },

    addClass : function(el, className) {
      app.f.iterateNodeList(el, function(el) {
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      });
    },

    toggleClass : function(el, className) {
      app.f.iterateNodeList(el, function(el){
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
    },

    removeClass : function(el, className) {
      app.f.iterateNodeList(el, function(el){
        if (el.classList) {
          el.classList.remove(className);
        }
        else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      });
    }  ,  

    // reset the yes / no message above map on slide 4
    resetSearchResultMsg : function() {
      if (el.yesNoState === true) {
        app.f.toggleClass(el.yes, 'hidden');
        app.f.toggleClass(el.no, 'hidden');
        el.yesNoState = false;
      }
    },

    // hide all validation errors
    hideFormValidationErrors : function() {
      var i=0, len=el.valErrors.length;
      for (i; i<len; i++) {
        if (app.f.hasClass(el.valErrors[i], 'vis-hidden')===false){
          app.f.addClass(el.valErrors[i], 'vis-hidden');
        }   
      }    
    },

    resetBoroValue : function() {
      el.dd.val = undefined;
      el.dd.placeholder.text('Select a Borough');
    },

    addToCalendar : function() {
      var curDate = new Date(),
            startDate,
            endDate;
      startDate = new Date(curDate);
      startDate.setDate(startDate.getDate() + 7);
      endDate = new Date(curDate);
      endDate.setDate(startDate.getDate() + 1);
      el.addToCalendar.innerHTML = 
          '<var class="atc_event">' +
              '<var class="atc_date_start">' + startDate + '</var>' +
              '<var class="atc_date_end">' + endDate + '</var>' +
              '<var class="atc_timezone">America/New_York</var>' +
              '<var class="atc_title">Check mail for my rent history</var>' +
              '<var class="atc_description">See if your rent history arrived in the mail, then go back to http://amirentstabilzed.com!</var>' +
              '<var class="atc_location">my house</var>'+
          '</var>';   
      // init the add to calendar library
      w.addtocalendar.load();
      // change the text of the link to be more descriptive
      var atcLink = d.querySelector('#atc_text_link_link.atcb-link');
      atcLink.innerHTML = "Click here to create a calendar reminder.";
      atcLink.tabindex = "-1";
    }
  };

})(window, document);