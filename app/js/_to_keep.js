/**
 * APPLICATION INIT
 */

app.init = (function (w, d) {
  // gets the whole thing going
  // called after langToggle loads JSON data for content
  function init() {
    // stores variables for various DOM nodes
    app.el = app.elems.refDOM();

    // sets up the address search form
    app.a = app.address.address();

    // functions for slides navigation
    app.f = app.helpers.registerfns();

    // sets up event listeners for various things
    app.l.listen();

    // sets up event listeners on the language toggle buttons
    app.language.initLangButtons();

    // sets state for current slide, why?
    app.events.publish("state-change", {
      currentSlide: app.el.slides[0],
    });

    // handle window resize
    app.f.onResize();

    // goes to the current slide (why?)
    app.f.goToSlide(app.el.currentSlide);

    // creates the mailto for DHCR when requesting rent history
    app.a.createMailTo();

    // sets up the (broken) add to calendar widget
    app.f.addToCalendar();

    // sets up the Leaflet / CartoDB map
    app.map.init();
  }

  return {
    init: init,
  };
})(window, document);

/**
 * HANDLEBARS LANGUAGE TOGGLING
 */

// language toggle module
// variables to reference the language toggle buttons
var $es, $zh, $en;

function langToggle(lang, callback) {
  // loads the correct lang json & template;
  // this gets called when the page first loads and when the user clicks the lang button
  var curLang = w.localStorage.getItem("lang") || "en";
  var currentPage = document.URL.substring(
    document.URL.lastIndexOf("/") + 1,
    document.URL.lastIndexOf(".")
  );

  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }

  loadTemplateData(curLang, currentPage);
}

function loadTemplateData(lang, currentPage, callback) {
  var template,
    html,
    filePath,
    contentFolder = "data/";

  // set variables to the correct JSON file & template based on the app's current page
  if (currentPage === "index") {
    filePath = contentFolder + "main-content.json";
    template = app.templates.main;
  } else if (currentPage === "why") {
    filePath = "../" + contentFolder + "why-content.json";
    template = app.templates.why;
  } else if (currentPage === "how") {
    filePath = "../" + contentFolder + "how-content.json";
    template = app.templates.how;
  } else if (currentPage === "resources") {
    filePath = "../" + contentFolder + "resources-content.json";
    template = app.templates.resources;
  }

  $.getJSON(filePath, function (data) {
    // load the correct language from the json data
    if (lang === "es") {
      html = template(data.languages.es);
    } else if (lang === "zh") {
      html = template(data.languages.zh);
    } else {
      html = template(data.languages.en);
    }
    d.querySelector("#wrapper").innerHTML = html;
    initLangButtons();
  }).done(function () {
    if (currentPage === "index") {
      /* app init() is called here */
      app.init.init();
    } else {
      app.pages.toggleBurger();
    }
    $es = $(".lang-toggle .toggle-es");
    $zh = $(".lang-toggle .toggle-zh");
    $en = $(".lang-toggle .toggle-en");
    changeLangButtons(lang);
    if (callback && typeof callback === "function") {
      callback();
    }
  });
}

function changeLangButtons(lang) {
  // change the language toggle buttons so the user can switch between them
  if (lang === "es") {
    $es.html("in english");
    $es.removeClass("toggle-es").addClass("toggle-en");
    $zh.html("中文");
    $("body").addClass("es");
    $("body").removeClass("en");
    $("body").removeClass("zh");
  } else if (lang === "zh") {
    $es.html("en español");
    $zh.html("in english");
    $zh.removeClass("toggle-zh").addClass("toggle-en");
    $("body").addClass("zh");
    $("body").removeClass("es");
    $("body").removeClass("en");
  } else {
    $es.html("en español");
    $zh.html("中文");
    $("body").addClass("en");
    $("body").removeClass("es");
    $("body").removeClass("zh");
  }
}

function initLangButtons() {
  // add the event listener
  $(".lang-toggle")
    .find("a")
    .on("click", function (e) {
      e.preventDefault();
      var lang;
      var val = $(this).html();
      if (val === "en español") {
        lang = "es";
      } else if (val === "中文") {
        lang = "zh";
      } else {
        lang = "en";
      }
      w.localStorage.setItem("lang", lang);
      langToggle(lang);
      return false;
    });
}

/**
 * HANDLEBARS HELPERS REGISTER
 */

H.registerHelper("each", function (context, options) {
  var ret = "";
  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
});

H.registerHelper("if", function (conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/**
 * ADDRESS VALIDATION (& GEOCODING?)
 */
var el = app.el;
var f = app.fns;
var state = app.s;
var parsed_address;

// form validation for when user enters address and selects boro
function checkAddressInput(address, borough) {
  if (address !== "" && borough !== undefined) {
    app.events.publish("state-change", {
      formFilled: true,
    });

    app.f.goToNextSlide();
    parsed_address = app.a.parseAddressInput(address);

    // delay API calls so user sees loading gif
    setTimeout(function () {
      // console.log('form filled, parsed address: ', parsed_address);
      app.map.fns.geoclient(parsed_address[0], parsed_address[1], borough);
    }, 1000);
  } else if (address === "" && borough === undefined) {
    if (
      app.f.hasClass(app.el.valErrorAddress, "vis-hidden") === true &&
      app.f.hasClass(app.el.valErrorBoro, "vis-hidden") === true
    ) {
      app.f.toggleClass(app.el.valErrorAddress, "vis-hidden");
      app.f.toggleClass(app.el.valErrorBoro, "vis-hidden");
    }
  } else if (borough === undefined) {
    // alert('Please select your borough.');
    if (app.f.hasClass(app.el.valErrorBoro, "vis-hidden") === true) {
      app.f.toggleClass(app.el.valErrorBoro, "vis-hidden");
    }
  } else if (address === "") {
    // alert('Please enter your house number and street.');
    if (app.f.hasClass(app.el.valErrorAddress, "vis-hidden") === true) {
      app.f.toggleClass(app.el.valErrorAddress, "vis-hidden");
    }
  } else {
    app.f.goToPrevSlide();
  }
}

// separate the building number and street name from the address input
function parseAddressInput(input) {
  var input_split = input.split(" "),
    len = input_split.length,
    num = input_split[0],
    input_last = input_split.splice(1, len),
    street = input_last.join(" ");
  return [num, street];
}

// create the mailto content for requesting rent history from dhcr
function createMailTo() {
  var email = "rentinfo@nyshcr.org",
    subject = "request for rent history",
    body =
      "DHCR administrator, \n\n" +
      "I, YOUR NAME HERE, am currently renting " +
      "YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE" +
      " and would like to request the complete rent history for this apartment back to the year 1984.\n\n" +
      "thank you,\n\n" +
      "- YOUR NAME HERE",
    msg =
      "mailto:" +
      encodeURIComponent(email) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  app.el.mailTo.setAttribute("href", msg);
}

/**
 * SLIDES NAVIGATION
 */
// key codes for up / down arrows for navigation
var keyCodes = {
  UP: 38,
  DOWN: 40,
};

function addEventListenerList(list, event, fn) {
  var i = 0,
    len = list.length;
  for (i; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

function onKeyDown(event) {
  var pressedKey = event.keyCode;
  if (pressedKey === keyCodes.UP) {
    app.f.goToPrevSlide();
    event.preventDefault();
  } else if (pressedKey === keyCodes.DOWN) {
    app.f.goToNextSlide();
    event.preventDefault();
  }
}

function onMouseWheel(event) {
  var delta = event / 30 || -event;
  if (delta < -1) {
    app.f.goToNextSlide();
  } else if (delta > 1) {
    app.f.goToPrevSlide();
  }
}

function getSlideIndex(slide) {
  var index;
  for (var i = 0; i < app.el.slides.length; i++) {
    if (app.el.slides[i] === slide) {
      index = i;
    }
  }
  return index;
}

function goToSlide(slide) {
  if (!state.isAnimating && slide) {
    app.events.publish("state-change", {
      isAnimating: true,
      currentSlide: slide,
    });

    var index = app.f.getSlideIndex(slide);
    // console.log('index: ', index, ' slide: ', slide);
    TweenLite.to(app.el.slidesContainer, 1, {
      scrollTo: { y: state.pageHeight * index },
      onComplete: app.f.onSlideChangeEnd,
    });
  }
}

function goToPrevSlide(callback) {
  var previous = app.f.getSlideIndex(state.currentSlide) - 1;
  // console.log('go previous slide', previous);
  if (previous >= 0) {
    app.f.goToSlide(app.el.slides[previous]);
    if (callback && typeof callback === "function") {
      callback();
    }
  }
}

function goToNextSlide(callback) {
  // console.log('local slide state: ', state);
  var index = app.f.getSlideIndex(state.currentSlide);
  var next = app.el.slides[index + 1];
  if (next && (index === 0 || (index >= 1 && state.formFilled === true))) {
    app.f.goToSlide(next);
    if (callback && typeof callback === "function") {
      callback();
    }
  }
}

function goToFirstSlide() {
  // reset everything to defaults
  if (state.currentSlide) {
    app.el.addressInput.value = "";
    app.f.resetSearchResultMsg();
    app.f.hideFormValidationErrors();
    app.f.resetBoroValue();
    app.map.resetMap();
    app.f.addClass(app.el.yes, "hidden");
    app.f.removeClass(app.el.no, "hidden");
    app.f.addClass(app.el.yesTR, "hidden");
    app.f.removeClass(app.el.noTR, "hidden");
    d.querySelector(".tr-modal").innerHTML = "";
    app.f.goToSlide(app.el.slides[0]);
    app.events.publish("state-change", {
      formFilled: false,
      yesNoState: false,
    });
  }
}

function onSlideChangeEnd() {
  app.events.publish("state-change", {
    isAnimating: false,
  });
  app.f.updateProgCircles(state.currentSlide);
}

function updateProgCircles(slide) {
  var s = app.f.getSlideIndex(slide),
    i = 0,
    l = app.el.progressCircles.length,
    backgroundSize;

  if (w.innerHeight <= 770 || w.innerWidth <= 1100) {
    backgroundSize = "20px";
  } else {
    backgroundSize = "25px";
  }

  for (i; i < l; i++) {
    var circle = app.el.progressCircles[i];
    if (s === i) {
      circle.style.backgroundImage = "url(assets/png/oval_25_filled.png)";
      circle.style.backgroundSize = backgroundSize;
      circle.style.backgroundRepeat = "no-repeat";
    } else {
      circle.style.background = "url(assets/png/oval_25_blank.png)";
      circle.style.backgroundSize = backgroundSize;
      circle.style.backgroundRepeat = "no-repeat";
    }
  }
}

/**
 * LEAFLET MAP & CARTO(DB) RELATED
 */

var initMap = function () {
  app.el.map = new L.Map("map", {
    center: [40.7127, -74.0059],
    zoom: 12,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
    keyboard: false,
  });

  if (app.el.map.tap) app.el.map.tap.disable();
  // app.el.map.style.cursor='default';

  var basemap = L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    }
  );

  var cdbURL =
    "https://chenrick.carto.com/api/v2/viz/c591fa2e-726b-11e6-83e8-0e05a8b3e3d7/viz.json";

  var cartocss =
    "#map_pluto_likely_rs_2016v1 {" +
    "polygon-fill: #FF6600;" +
    "polygon-opacity: 0.6;" +
    "line-color: #FFF;" +
    "line-width: 0.7;" +
    "line-opacity: 0.3;" +
    "}";

  var sql =
    "SELECT the_geom, the_geom_webmercator, cartodb_id, address, borough, ownername, unitsres " +
    "FROM map_pluto_likely_rs_2016v1";

  var taxLots;

  app.el.map.addLayer(basemap);

  cartodb
    .createLayer(
      el.map,
      cdbURL,
      {
        cartodb_logo: false,
        legends: false,
        https: true,
        fullscreen: true,
      },
      function (layer) {
        taxLots = layer.getSubLayer(0);
        taxLots.setCartoCSS(cartocss);
        taxLots.setInteraction(false);
        app.el.map.addLayer(layer, false);
        basemap.bringToBack();
      }
    )
    .done(function (layer) {});
};

function resetMap() {
  if (addressMarker) {
    app.el.map.removeLayer(addressMarker);
  }
  app.el.map.setView([40.7127, -74.0059], 12);
}

/**
 * GEOCODING / ADDRESS SEARCH
 */
var el = {}, // to store DOM element references from app.ui
  f = {}, // to store DOM manipulation and UI functions from app.ui
  state = app.s,
  addressMarker, // leaflet marker to locate user's address on map
  sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
  g = {}, // to store properties from NYC Geoclient API result
  source = d.getElementById("org-template").innerHTML,
  template = H.compile(source),
  hbData = { orgs: [] };

// grab property data from nyc geo-client api
function geoclient(num, name, boro) {
  // create URL to pass to geoclient api
  var id = "9cd0a15f",
    appID = "app_id=" + id + "&",
    key = "54dc84bcaca9ff4877da771750033275",
    appKey = "app_key=" + key,
    stNum = "houseNumber=" + num + "&",
    nameEncoded = name.replace(" ", "+"),
    stName = "street=" + nameEncoded + "&",
    borough = "borough=" + boro + "&",
    url = "https://api.cityofnewyork.us/geoclient/v1/address.json?",
    urlConcat = url + stNum + stName + borough + appID + appKey;

  getJSON(urlConcat, "jsonp", checkResult);
}

// see if the geolient result has a bbl
function checkResult(data) {
  if (typeof data === "object" && data.address.bbl !== undefined) {
    var d = data.address;
    g = {
      bbl: d.bbl,
      lon: d.longitudeInternalLabel,
      lat: d.latitudeInternalLabel,
      hNo: d.houseNumber,
      sName: d.streetName1In,
      bCode: d.boroughCode1In,
      bUSPS: d.uspsPreferredCityName,
      zip: d.zipCode,
      cd: d.communityDistrict,
      bin: d.giBuildingIdentificationNumber1,
      tr_groups: [],
    };
    var gcr_stringify = JSON.stringify(g);
    _gaq.push(["_trackEvent", "Geoclient Success", "Result", gcr_stringify]);

    // console.log('geoclient success, data: ', g);
    showMarker(data);
    getCDBdata(g.bbl);
    //call here function that get's BIN(g.bin), calls API, gets BIN's matching URL, and set's value to button Rent Logic
    bintoURL(g.bin);
  } else {
    // geoclient didn't recognize the address, ask user to try again
    app.el.addressInput.value = "";
    app.f.resetBoroValue();

    if (app.f.hasClass(app.el.valErrorNF, "vis-hidden") === true) {
      app.f.toggleClass(app.el.valErrorNF, "vis-hidden");
    }
    if (app.f.hasClass(app.el.valErrorBoro, "vis-hidden") === false) {
      app.f.addClass(app.el.valErrorBoro, "vis-hidden");
    }
    if (app.f.hasClass(app.el.valErrorAddress, "vis-hidden") === false) {
      app.f.addClass(app.el.valErrorAddress, "vis-hidden");
    }

    app.events.publish("state-change", {
      formFilled: false,
      yesNoState: false,
    });
    app.f.goToPrevSlide();
  }
}

// maps BIN to Rent Logic URL and set it to the button View Building Info at RentLogic
function bintoURL(bin) {
  var cartourl =
    "https://chenrick.carto.com/api/v2/sql?q=SELECT+url+FROM+bin_bbl_url+WHERE+bin=" +
    bin;
  // API request:
  $.getJSON(cartourl, function (data) {})
    .done(function (data) {
      var rentLogicURL = data.rows[0].url || "http://www.rentlogic.com";
      document.getElementById("rent-logic").href = rentLogicURL;
    })
    .fail(function () {
      document.getElementById("rent-logic").href = "http://www.rentlogic.com";
    });
}

function trQuery(lat, lon) {
  // construct the tenants rights group query
  var query =
    "SELECT * FROM nyc_tenants_rights_service_areas " +
    "WHERE " +
    "ST_Contains(" +
    "nyc_tenants_rights_service_areas.the_geom," +
    "ST_GeomFromText(" +
    "'Point(" +
    lon +
    " " +
    lat +
    ")', 4326" +
    ")" +
    ");";
  return query;
}

// check the bbl number against the cartodb data
function getCDBdata(bbl, data) {
  // sql to pass cartodb's sql api
  var sql1 =
    "SELECT bbl FROM map_pluto_likely_rs_2016v1 " + "WHERE bbl = " + bbl;
  var sql2 = trQuery(g.lat, g.lon);

  getJSON(sqlURL + sql1, "json", checkRS);
  getJSON(sqlURL + sql2, "json", checkTR);
}

function checkRS(data) {
  if (data.rows.length > 0 && state.yesNoState === false) {
    var bbl_match = JSON.stringify(data.rows[0].bbl);
    _gaq.push(["_trackEvent", "CDB", "Match", bbl_match]);
    app.f.toggleClass(app.el.yes, "hidden");
    app.f.toggleClass(app.el.no, "hidden");
    app.events.publish("state-change", { yesNoState: true });
  }

  app.f.goToNextSlide();
}

function checkTR(data) {
  if (data.rows.length > 0) {
    app.f.addClass(app.el.noTR, "hidden");
    app.f.removeClass(app.el.yesTR, "hidden");

    var i = 0,
      l = data.rows.length;
    for (i; i < l; i++) {
      var x = data.rows[i];
      g.tr_groups.push(x);
      hbData.orgs.push(handlebarsMake(x));
    }
    var html = template(hbData);
    app.el.trModal.innerHTML = html;
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
    description: data.description,
  };
  // var html = template(context);
  return context;
}

function showMarker(data) {
  // console.log('showMarker data: ', data);
  var x = data.address.longitudeInternalLabel,
    y = data.address.latitudeInternalLabel,
    latlng = [y, x],
    address =
      data.address.houseNumber +
      " " +
      data.address.firstStreetNameNormalized +
      "<br>" +
      data.address.uspsPreferredCityName +
      ", NY " +
      data.address.zipCode;
  // remove geocoded marker if one already exists
  if (addressMarker) {
    app.el.map.removeLayer(addressMarker);
  }
  // add a marker and pan and zoom the el.map to it
  addressMarker = new L.marker(latlng).addTo(el.map);
  app.el.map.setView(latlng, 16);
  addressMarker.bindPopup("<b>" + address + "</b>").openPopup();
}

/**
 * NON-INDEX HTML PAGE HELPERS
 */
function iterateNodeList(list, fn) {
  if (list && list.length) {
    var i = 0,
      len = list.length;
    for (i; i < len; i++) {
      return fn(list[i], i);
    }
  }
  if (list && !list.length) {
    return fn(list);
  }
}

function toggleClass(el, className) {
  iterateNodeList(el, function (el) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(" ");
      var existingIndex = classes.indexOf(className);
      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
        el.className = classes.join(" ");
      }
    }
  });
}

function toggleBurger() {
  // hamburger icon
  var burgerIcon = document.querySelector(".burger"),
    mainNavList = document.querySelector(".main-nav ul");
  burgerIcon.addEventListener("click", function (e) {
    e.preventDefault();
    toggleClass(burgerIcon, "open");
    toggleClass(mainNavList, "responsive");
  });
}

/**
 * APPLICATION STATE
 */
var state = {
  formFilled: false, // has the user filled out the address form?
  currentSlide: null, // current slide the user is on
  isAnimating: false, // if the app is animating from one slide to another
  pageHeight: null, // slide height is set to page height minus the height of top nav bar
  yesNoState: false, // false = address not found in db, true = found
  propertyData: null, // data returned from the geoclient api
};

app.events.subscribe("state-change", function (updates) {
  if (updates.isAnimating !== undefined)
    state.isAnimating = updates.isAnimating;
  if (updates.formFilled !== undefined) state.formFilled = updates.formFilled;
  if (updates.currentSlide !== undefined)
    state.currentSlide = updates.currentSlide;
  if (updates.pageHeight !== undefined) state.pageHeight = updates.pageHeight;
  if (updates.yesNoState !== undefined) state.yesNoState = updates.yesNoState;
  if (updates.propertyData !== undefined)
    state.propertyData = updates.propertyData;
  app.events.publish("state-updated", state);
});

/**
 * DROPDOWN COMPONENT CLASS
 */
// (believe this is for the boro selection?)
// drop down class
//  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children("span");
  this.opts = this.dd.find("ul.drop-down > li > a");
  this.val = undefined;
  this.name = undefined;
  this.index = -1;
  this.initEvents();
}

// dropdown
DropDown.prototype = {
  initEvents: function () {
    var obj = this;

    // console.log('initEvents this: ', this);

    obj.dd.on("click", function (e) {
      e.preventDefault();
      // $(this).toggleClass('active');
      app.f.toggleClass(this, "active");
      return false;
    });

    obj.opts.on("click", function (e) {
      e.preventDefault();
      var opt = $(this);
      obj.val = opt.data("boro");
      obj.name = opt.text();
      // obj.data = opt.children('span').text();
      obj.index = opt.index();
      obj.placeholder.text("Borough: " + obj.name);
      // console.log('obj: ', obj);
    });
  },

  getValue: function () {
    return this.val;
  },

  getIndex: function () {
    return this.index;
  },
};
