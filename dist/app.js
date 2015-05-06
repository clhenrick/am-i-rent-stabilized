var app = app || {};

app.events = (function(w, d, $) {    

    var publish = function (name, o) {
       
       // console.log("EVENT [" + name + "]", o);
        $(document).trigger(name, [o]);
    
    };

    var subscribe = function (name, callback) {
        
        $(document).on(name, function(event, o){            
            callback(o);
        });

    };

    return {
        publish : publish,
        subscribe : subscribe
    }; 

})(window, document, jQuery);
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

var app = app || {};

app.el = (function(w,d,$) { 
  var el;
  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li > a');
    this.val = undefined;    
    this.name = undefined;
    this.index = -1;
    this.initEvents();
  }  

  // dropdown
  DropDown.prototype = {
    initEvents : function() {
      var obj = this;

      // console.log('initEvents this: ', this);

      obj.dd.on('click', function(e){
        e.preventDefault();
        // $(this).toggleClass('active');
        app.f.toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.data("boro");
        obj.name = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.name);        
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

  // references to DOM elements
  function refDOM(){
    el =  {
      navGoNext : d.querySelectorAll('.go-next'),
      navGoFirst : d.querySelectorAll('.go-first'),
      navGoFour : d.querySelectorAll('.go-step4'),
      burgerIcon : d.querySelector('.burger'),
      navBar : d.querySelector('.main-nav'),
      mainNavList : d.querySelector('.main-nav ul'),
      progressCircles : d.querySelectorAll('.margin-circles li'),
      slidesContainer : d.querySelector('.slides-container'),
      slides : d.querySelectorAll('.slide'),
      slide4 : d.querySelector('#slide-8'),
      dd : new DropDown( $('.user-data.borough-select')),
      addressInput : d.querySelector('.address-input'),
      boroSelect : d.querySelector('.user-data.borough-select'),
      boroDropDown : d.getElementById('boroughs'),
      boroDropDownItems : d.querySelectorAll('#boroughs li a'),
      selectBoro : d.getElementsByName('borough'),
      search : d.querySelector('.search'),
      valErrors : d.querySelectorAll('.validation-error'),
      valErrorAddress : d.getElementById('error-address'),
      valErrorBoro : d.getElementById('error-boro'),
      valErrorNF : d.getElementById('error-not-found'),
      yes : d.querySelectorAll('.yes'),
      no : d.querySelectorAll('.no'),
      yesNoState : false,
      map : d.getElementById('map'),
      mapMessage : d.querySelector('.map-message'),
      mailTo : d.getElementById('mail-to'),
      lightBox : d.getElementById('rent-history'),
      addToCalendar : d.getElementById('atc_text_link'),
      addToCalendarLink : d.querySelector('.atcb-link'),
      noTR : d.querySelector('.no-local-tr'),
      yesTR : d.querySelector('.yes-local-tr'),
      trModal : d.getElementsByClassName('tr-modal')[0],           
      learnMore : d.querySelector('.button.learn-more')
    };

    return el;
  }
  
   // trModalClose : d.querySelector('.org-container .close'),      

  return {
    refDOM : refDOM
  };

})(window, document, jQuery);
var app = app || {};

app.helpers = (function(w,d,el) {
  
  // var el = app.el.refDOM();
  var state = app.s;
  app.f = {};

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // key codes for up / down arrows for navigation
  var keyCodes = {
    UP : 38,
    DOWN : 40
  };  

  function registerfns() {
    app.f = {
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
          for (var i=0; i < app.el.slides.length; i++) { 
            if (app.el.slides[i] === slide) { 
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
          // console.log('index: ', index, ' slide: ', slide);                 
          TweenLite.to(app.el.slidesContainer, 1, {scrollTo: {y: state.pageHeight * index}, onComplete: app.f.onSlideChangeEnd});
        }
      },

      goToPrevSlide : function(callback){          
        var previous = app.f.getSlideIndex(state.currentSlide) -1;
        console.log('go previous slide', previous);
        if (previous >=0) {      
          app.f.goToSlide(app.el.slides[previous]);       
          if (callback && typeof callback === "function") { 
            callback();
          }
        }    
      },

      goToNextSlide: function(callback) {
        // console.log('local slide state: ', state);
        var index = app.f.getSlideIndex(state.currentSlide);
        var next = app.el.slides[index + 1];
        if (next && ( index === 0 || (index >= 1 && state.formFilled === true ) ) ) {      
          app.f.goToSlide(next);
          if (callback && typeof callback === "function") { 
            callback(); 
          }  
        }      
      },

      goToFirstSlide : function() {
        // reset everything to defaults
        if (state.currentSlide) {
          app.el.addressInput.value = '';
          app.f.resetSearchResultMsg();      
          app.f.hideFormValidationErrors();
          app.f.resetBoroValue();
          app.map.resetMap();
          app.f.addClass(el.yes, 'hidden');
          app.f.removeClass(el.no, 'hidden');
          app.f.addClass(el.yesTR, 'hidden');
          app.f.removeClass(el.noTR, 'hidden');
          d.querySelector('.tr-modal').innerHTML = '';
          app.f.goToSlide(app.el.slides[0]);
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
              l = app.el.progressCircles.length,
              backgroundSize;

        if (w.innerHeight <= 700 || w.innerWidth <= 1100) {
          backgroundSize = '20px';
        } else {
          backgroundSize = '25px';
        }
        
        for (i; i<l; i++) {
          var circle = app.el.progressCircles[i];
          if (s===i) {
            circle.style.backgroundImage = 'url(../assets/png/oval_25_filled.png)';
            circle.style.backgroundSize = backgroundSize;
            circle.style.backgroundRepeat = 'no-repeat';        
          } else {
            circle.style.background = 'url(../assets/png/oval_25_blank.png)';
            circle.style.backgroundSize = backgroundSize; 
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
        var newPageHeight = w.innerHeight - 60;
        var slide = state.currentSlide;
        var index = app.f.getSlideIndex(slide);
        if (state.pageHeight !== newPageHeight) {
          app.events.publish('state-change', { pageHeight : newPageHeight });
          //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
          TweenLite.set([app.el.slidesContainer, app.el.slides], {height: state.pageHeight + "px"});
          //The current slide should be always on the top
          TweenLite.set(app.el.slidesContainer, {scrollTo: {y: state.pageHeight * index}});
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
        if (app.el.yesNoState === true) {
          app.f.toggleClass(el.yes, 'hidden');
          app.f.toggleClass(el.no, 'hidden');
          app.el.yesNoState = false;
        }
      },

      // hide all validation errors
      hideFormValidationErrors : function() {
        var i=0, len=app.el.valErrors.length;
        for (i; i<len; i++) {
          if (app.f.hasClass(app.el.valErrors[i], 'vis-hidden')===false){
            app.f.addClass(app.el.valErrors[i], 'vis-hidden');
          }   
        }    
      },

      resetBoroValue : function() {
        app.el.dd.val = undefined;
        app.el.dd.placeholder.text('Select a Borough');
      },

      addToCalendar : function() {
        var curDate = new Date(),
              startDate,
              endDate;
        startDate = new Date(curDate);
        startDate.setDate(startDate.getDate() + 7);
        endDate = new Date(curDate);
        endDate.setDate(startDate.getDate() + 1);
        app.el.addToCalendar.innerHTML = 
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
        var atcLink = d.querySelector('.atcb-link');
        atcLink.innerHTML = "Create a calendar reminder.";
        atcLink.tabindex = "-1";
      }
    };
    return app.f;
  }

  return {
    registerfns : registerfns
  };

})(window, document, app.el);
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
      if (app.el.addressInput.value !== "" && app.f.hasClass(el.valErrorAddress, 'vis-hidden') !== true) {
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
var app = app || {};

app.a = (function(w,d) {
  /*
  ** User address related functions
   */

   var el = app.el;
   var f = app.fns;
   var state = app.s;

   function address() {
     return {
       // form validation for when user enters address and selects boro
      checkAddressInput : function(address, borough) {        
        if (address !== "" && borough !== undefined) {  
          app.events.publish('state-change', {
            formFilled : true
          });
          
          app.f.goToNextSlide();
          var parsed_address = app.a.parseAddressInput(address);      
          // delay API calls so user sees loading gif
          setTimeout(function(){    
            console.log('form filled, parsed address: ', parsed_address);
            app.map.geoclient(parsed_address[0], parsed_address[1], borough); 
          }, 1000);              

        } else if (address === "" && borough === undefined) {      
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true && app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true){
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (borough === undefined) {
          // alert('Please select your borough.');
          if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (address === '') {
          // alert('Please enter your house number and street.');
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
          }

        } else {
          app.f.goToPrevSlide();
        } 
      },

      // separate the building number and street name from the address input
      parseAddressInput : function(input) {
        var input_split = input.split(' '),
              len = input_split.length,
              num = input_split[0],
              input_last = input_split.splice(1, len),
              street = input_last.join(' ');
        return [num, street];
      },

      // create the mailto content for requesting rent history from dhcr
      createMailTo : function() {
        var email = "rentinfo@nyshcr.org",
              subject = "request for rent history",
              body = "Hello, \n\n" +
                          "I, YOUR NAME HERE, am currently renting " + 
                          "YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE" +
                          " and would like to request the rent history for this apartment." +
                          " Any information you can provide me would be greatly appreciated. \n\n" +
                          "thank you,\n\n" +
                          "- YOUR NAME HERE",
              msg = 'mailto:' + encodeURIComponent(email) +
                         '?subject=' + encodeURIComponent(subject) +
                         '&body=' + encodeURIComponent(body); 
        app.el.mailTo.setAttribute('href', msg);
      }   
    };
   }

   return {
    address : address
   };

})(window, document);
// map & cartodb stuff
var app = app || {};

app.map = (function(d,w,a,H,$){
  var el = {}, // to store DOM element references from app.ui
      f = {},  // to store DOM manipulation and UI functions from app.ui
      state = app.s,
      addressMarker, // leaflet marker to locate user's address on map
      sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
      g = {}, // to store properties from NYC Geoclient API result
      trmodal = d.getElementsByClassName('tr-modal')[0],
      source = $("#org-template").html(),
      template = H.compile(source),
      noTR = d.querySelector('.no-local-tr'),
      yesTR = d.querySelector('.yes-local-tr'),
      hbData = {orgs: []};

  Handlebars.registerHelper('each', function(context, options) {
    var ret = "";
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });

  Handlebars.registerHelper('if', function(conditional, options) {
    if (conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });   

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  function getJSON(url, type, callback) {
    a().url(url)
        .type(type)
        .on('success', function(data){
          callback(data);
          console.log('getJSON data: ', data);
        })
        .on('error', function(err){
          callback('error');
        })
        .go();
  }

  // grab property data from nyc geo-client api
  var geoclient = function(num, name, boro) {
    // create URL to pass to geoclient api
    var id = '9cd0a15f',
          appID = 'app_id=' + id + '&',
          key = '54dc84bcaca9ff4877da771750033275',
          appKey = 'app_key=' + key,
          stNum = 'houseNumber='+ num + '&',
          nameEncoded = name.replace(' ', '+'),
          stName = 'street=' + nameEncoded + '&',
          borough = 'borough=' + boro + '&',
          url = 'https://api.cityofnewyork.us/geoclient/v1/address.json?',
          urlConcat = url + stNum + stName + borough + appID + appKey;

    console.log('getting json...');
    getJSON(urlConcat, 'jsonp', checkResult);      
  };

  // see if the geolient result has a bbl
  var checkResult = function(data) {
    if (typeof data === "object" && data.address.bbl !== undefined ) {      
      var d = data.address;
      g =  {
        bbl : d.bbl,
        lon : d.longitudeInternalLabel,
        lat : d.latitudeInternalLabel,
        hNo : d.houseNumber,
        sName : d.streetName1In,
        bCode : d.boroughCode1In,
        bUSPS : d.uspsPreferredCityName,
        zip : d.zipCode,
        cd: d.communityDistrict,
        bin : d.giBuildingIdentificationNumber1,
        tr_groups : []
      };      
      var bbl = d.bbl;
      var gcr_stringify = JSON.stringify(g);
      _gaq.push(['_trackEvent', 'Geoclient Success', 'Result', gcr_stringify]);

      console.log('geoclient success, data: ', g);
      
      getCDBdata(bbl);
      showMarker(data);

    } else {      

      app.el.addressInput.value='';
      app.f.resetBoroValue();      
      if (app.f.hasClass(app.el.valErrorNF, 'vis-hidden')===true) {
        app.f.toggleClass(app.el.valErrorNF, 'vis-hidden');
      }
      if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===false) {
        app.f.addClass(app.el.valErrorBoro, 'vis-hidden');
      }
      if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===false) {
        app.f.addClass(app.el.valErrorAddress, 'vis-hidden');
      }
      
      app.events.publish('state-change', { formFilled : false });
      app.f.goToPrevSlide(); 
    }     
  };

  function trQuery(lat, lon) {
    // construct the tenants rights group query
    var query = "SELECT * FROM nyc_tenants_rights_service_areas " +
                "WHERE " +
                "ST_Contains(" +
                  "nyc_tenants_rights_service_areas.the_geom," +
                  "ST_GeomFromText(" +
                   "'Point(" + lon + " " + lat + ")', 4326" +
                  ")" +      
                ");";  
    return query;
  }  

  // check the bbl number against the cartodb data
  var getCDBdata = function(bbl) {
    // sql to pass cartodb's sql api
    var sql1 = "SELECT bbl FROM map_pluto_likely_rs " +
                  "WHERE bbl = " + bbl;    
    var sql2 = trQuery(g.lat, g.lon);                  

    getJSON(sqlURL + sql1, 'json', checkRS);
    getJSON(sqlURL + sql2, 'json', checkTR);
  };

  function checkRS(data) {
    if (data.rows.length > 0 && state.yesNoState === false) {      
      var bbl_match = JSON.stringify(data.rows[0].bbl);
      _gaq.push(['_trackEvent', 'CDB', 'Match', bbl_match]);
      app.f.toggleClass(app.el.yes, 'hidden');
      app.f.toggleClass(app.el.no, 'hidden');
      app.events.publish('state-change', { yesNoState : true });            
    } 

    app.f.goToNextSlide();
  }

  function checkTR(data) {
    if (data.rows.length > 0) {
      app.f.addClass(noTR, 'hidden');
      app.f.removeClass(yesTR, 'hidden');
      
      var i = 0, l = data.rows.length;
      for (i; i<l; i++) {
        var x = data.rows[i];
        g.tr_groups.push(x);
        hbData.orgs.push(handlebarsMake(x));
      }
      var html = template(hbData);
      trmodal.innerHTML = html;
      g.tr_groups.length = 0;     
    } 
  }

  function handlebarsMake(data) {
    var context = {
      name: data.name,
      website: data.website_url,
      phone: data.phone,
      email: data.email,
      address: data.address,
      description: data.description
    };
    // var html = template(context);
    return context;
  }  

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(data) {   
    console.log('cdb data: ', data); 
    if (data.rows.length > 0 && state.yesNoState === false) {
      console.log('bbl match!');
      var bbl_match = JSON.stringify(data.rows[0].bbl);
      _gaq.push(['_trackEvent', 'CDB', 'Match', bbl_match]);
      app.f.toggleClass(el.yes, 'hidden');
      app.f.toggleClass(el.no, 'hidden');
      app.events.publish('state-change', { yesNoState : true });
    } 
    app.f.goToNextSlide();
    // console.log('checkData goToNextSlide called');
  };

  var showMarker = function(data) {
    // console.log('showMarker data: ', data);
    var x = data.address.longitudeInternalLabel,
          y = data.address.latitudeInternalLabel,
          latlng = [y, x],
          address = data.address.houseNumber + ' ' + 
                          data.address.firstStreetNameNormalized + '<br>' +
                          data.address.uspsPreferredCityName + ', NY ' +
                          data.address.zipCode;
    // remove geocoded marker if one already exists
    if (addressMarker) { 
      app.el.map.removeLayer(addressMarker);
    }
    // add a marker and pan and zoom the el.map to it
    addressMarker = new L.marker(latlng).addTo(el.map);
    addressMarker.on('popupopen', function(e){
      app.el.map.setView(latlng, 16);  
    }); 
    addressMarker.bindPopup("<b>" + address + "</b>").openPopup();   
  };

  // set up the leaflet / cartodb map
  var initMap = function() {
    app.el.map = new L.Map('map', {
      center : [40.7127, -74.0059],
      zoom : 12,
      dragging : false,
      touchZoom : false,
      doubleClickZoom : false,
      scrollWheelZoom : false,
      zoomControl : false,
      keyboard : false
    });

    var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    var cdbURL = 'https://chenrick.cartodb.com/api/v2/viz/20b7c6ac-ee12-11e4-b74e-0e853d047bba/viz.json';

    var cartocss = "#all_map_pluto_rent_stabl_reg_2014v1 {" +
                      "polygon-fill: #FF6600;" +
                      "polygon-opacity: 0.6;" +
                      "line-color: #000;" +
                      "line-width: 0.7;" +
                      "line-opacity: 0.3;" +
                    "}";
                    
    var sql = 'SELECT the_geom, the_geom_webmercator, cartodb_id, address, borough, ownername, unitsres ' + 
              'FROM all_nyc_likely_rent_stabl_merged';

    var taxLots;

    app.el.map.addLayer(basemap);

    cartodb.createLayer(el.map, cdbURL, {
        cartodb_logo: false, 
        legends: false,
        https: true,
        fullscreen : true     
    },
    function(layer) {
      taxLots = layer.getSubLayer(0);
      taxLots.setCartoCSS(cartocss);
      // taxLots.setSQL(sql);
      // taxLots.setInteraction(true);
      // taxLots.setInteractivity('address, borough, unitsres, ownername');
      // taxLots.on('click', function(e, pos, latlng, data){
      //   console.log('data: ', data);
      // });
      
      app.el.map.addLayer(layer, false);
      basemap.bringToBack();
    })
    // .addTo(el.map)
    .done(function(layer){
      // console.log(layer);
      // basemap.bringToBack();
    });    
  }; // end initMap()

  var resetMap = function() {
    if (addressMarker) {
      app.el.map.removeLayer(addressMarker);
    }
    app.el.map.setView([40.7127, -74.0059], 12);
  };

  function init() {
    el = app.el;
    f = app.f;
    state = app.s;
    initMap();
  }

  return   {
    init : init,
    geoclient : geoclient,
    resetMap : resetMap
  };

})(document, window, aja, Handlebars, jQuery);
var app = app || {};

app.init = (function(w,d){
  
  function init(){
    var template = Handlebars.templates.main;

    $.getJSON('../data/content.json', function(data){
      html = template(data.languages[0].en);
      document.querySelector('#wrapper').innerHTML = html;
    })
      .done(function(){
      app.el = app.el.refDOM();
      app.a = app.a.address();
      app.f = app.helpers.registerfns();
      app.l.listen();

      app.events.publish('state-change', {
        currentSlide : app.el.slides[0]
      });

      app.f.onResize();
      app.f.goToSlide(app.el.currentSlide);
      app.a.createMailTo();
      app.f.addToCalendar();
      app.map.init();
    });
  }
  
  return {
    init : init
  };

})(window, document);