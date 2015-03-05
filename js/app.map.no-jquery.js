// map & cartodb stuff
var app = app || {};

app.map = (function(w,d){   
   var el = {}, // to store DOM element references from app.ui
      f = {},  // to store DOM manipulation and UI functions from app.ui
      addressMarker, // leaflet marker to locate user's address on map
      sqlURL = "http://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
      geoclientResult = {}; // to store properties from NYC Geoclient API result

  // function to perform JSONP GET request
  var loadJSONP = (function(){
    var unique = 0;
    return function(url, callback, context) {
      // INIT
      var name = "_jsonp_" + unique++;
      if (url.match(/\?/)) url += "&callback="+name;
      else url += "?callback="+name;
      
      // Create script
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      
      // Setup handler
      window[name] = function(data){
        callback.call((context || window), data);
        document.getElementsByTagName('head')[0].removeChild(script);
        script = null;
        delete window[name];
      };
      
      // Load JSON
      document.getElementsByTagName('head')[0].appendChild(script);
    };
  })();

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
          boro = 'borough=' + boro + '&',
          url = 'https://api.cityofnewyork.us/geoclient/v1/address.json?',
          urlConcat = url + stNum + stName + boro + appID + appKey;

      loadJSONP(urlConcat, checkResult);      
  }

  // see if the geolient result has a bbl
  var checkResult = function(data) {
    var d = data.address;    
    geoclientResult =  {
      bbl : d.bbl,
      lon : d.longitudeInternalLabel,
      lat : d.latitudeInternalLabel,
      hNo : d.houseNumber,
      sName : d.streetName1In,
      bCode : d.boroughCode1In,
      bUSPS : d.uspsPreferredCityName,
      zip : d.zipCode,
      cd: d.communityDistrict,
      bin : d.giBuildingIdentificationNumber1
    };

    console.log('geoclient result: ', geoclientResult);
    
    if (d.bbl) {
      var bbl = d.bbl; 
      getCDBdata(bbl);
      showMarker(data);
    } else {      
      app.ui.el.addressInput.value='';
      app.ui.f.resetBoroValue();
      // alert('Sorry but we didn\'t recognize that address, please try again.');
      if (app.ui.f.hasClass(app.ui.el.valErrorNF, 'hidden')===true) {
        app.ui.f.toggleClass(app.ui.el.valErrorNF, 'hidden');
      }
      if (app.ui.f.hasClass(app.ui.el.valErrorBoro, 'hidden')===false) {
        app.ui.f.addClass(app.ui.el.valErrorBoro, 'hidden');
      }
      if (app.ui.f.hasClass(app.ui.el.valErrorAddress, 'hidden')===false) {
        app.ui.f.addClass(app.ui.el.valErrorAddress, 'hidden');
      }      
      app.ui.f.goToPrevSlide();
    }     
  }

 // check the bbl number against the cartodb data
  var getCDBdata = function(bbl) {
    // sql to pass cartodb's sql api
    var sql = "SELECT * FROM all_nyc_likely_rent_stabl_merged " +
                  "WHERE bbl = " + bbl;

    var request = new XMLHttpRequest();
    request.open('GET', sqlURL + sql, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!      
        var data = JSON.parse(request.responseText);
        checkData(data);
        console.log('cdb success: ', data);
      } else {
        // We reached our target server, but it returned an error
        console.log('error reaching cdb sql api');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('request error');
    };
    request.send();
  };

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(data) {    
    if (data.rows.length > 0) {
      f.toggleClass(el.yes, 'hidden');
      f.toggleClass(el.no, 'hidden');    
    } 
    f.goToNextSlide();
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
    console.log('x: ', x, ' y: ', y, ' latlng: ', latlng);
    // remove geocoded marker if one already exists
    if (addressMarker) { 
      el.map.removeLayer(addressMarker);
    }
    // add a marker and pan and zoom the el.map to it
    addressMarker = new L.marker(latlng).addTo(el.map);
    addressMarker.on('popupopen', function(e){
      // console.log('marker pop up open: ', e);
      el.map.setView(latlng, 17);  
    }); 
    addressMarker.bindPopup("<b>" + address + "</b>" ).openPopup();   
  };

  // set up the leaflet / cartodb map
  var initMap = function() {
    el.map = new L.Map('map', {
      center : [40.7127, -74.0059],
      zoom : 12,
      dragging : false,
      touchZoom : false,
      doubleClickZoom : false,
      scrollWheelZoom : false,
      zoomControl : false
    });

    var tonerLite = new L.StamenTileLayer('toner-lite');
    el.map.addLayer(tonerLite);

    cartodb.createLayer(el.map, {
      user_name : 'chenrick',
      legends: false,
      cartodb_logo: false,
      type: 'cartodb',
      sublayers: [{
        sql : 'SELECT * FROM all_nyc_likely_rent_stabl_merged',
        cartocss : "#all_map_pluto_rent_stabl_reg_2014v1 {" +
                          "polygon-fill: #FF6600;" +
                          "polygon-opacity: 0.8;" +
                          "line-color: #000;" +
                          "line-width: 0.2;" +
                          "line-opacity: 0.2;" +
                        "}"
      }]
    })
    .addTo(el.map)
    .done(function(layer){
      // console.log(layer);
      tonerLite.bringToBack();
    });    

  } // end initMap()

  function init() {
    el = app.ui.el;
    f = app.ui.f
    initMap();
  }

  return {
    init : init,
    geoclient : geoclient
  }

})(window, document);