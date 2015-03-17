// map & cartodb stuff
var app = app || {};

app.map = (function(w,d,a){   
   var el = {}, // to store DOM element references from app.ui
      f = {},  // to store DOM manipulation and UI functions from app.ui
      addressMarker, // leaflet marker to locate user's address on map
      sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
      geoclientResult = {}; // to store properties from NYC Geoclient API result

  function getJSON(url, type, callback) {
    a().url(url)
        .type(type)
        .on('success', function(data){
          callback(data);
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
          boro = 'borough=' + boro + '&',
          url = 'https://api.cityofnewyork.us/geoclient/v1/address.json?',
          urlConcat = url + stNum + stName + boro + appID + appKey;

      getJSON(urlConcat, 'jsonp', checkResult);      
  }

  // see if the geolient result has a bbl
  var checkResult = function(data) {
    if (typeof data === "object" && data.address.bbl !== undefined ) {
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
      var bbl = d.bbl; 
      getCDBdata(bbl);
      showMarker(data);
    } else {      
      app.ui.el.addressInput.value='';
      app.ui.f.resetBoroValue();      
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
    var sql = "SELECT bbl FROM all_nyc_likely_rent_stabl_merged " +
                  "WHERE bbl = " + bbl;
    getJSON(sqlURL + sql, 'json', checkData);
  };

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(data) {    
    if (data.rows.length > 0 && el.yesNoState === false) {      
      f.toggleClass(el.yes, 'hidden');
      f.toggleClass(el.no, 'hidden');
      el.yesNoState = true;
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

    var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    el.map.addLayer(basemap);

    cartodb.createLayer(el.map, {
      user_name : 'chenrick',
      legends: false,
      cartodb_logo: false,
      type: 'cartodb',
      sublayers: [{
        sql : 'SELECT the_geom, the_geom_webmercator, cartodb_id FROM all_nyc_likely_rent_stabl_merged',
        cartocss : "#all_map_pluto_rent_stabl_reg_2014v1 {" +
                          "polygon-fill: #FF6600;" +
                          "polygon-opacity: 0.6;" +
                          "line-color: #000;" +
                          "line-width: 0.7;" +
                          "line-opacity: 0.5;" +
                        "}"
      }]
    })
    .addTo(el.map)
    .done(function(layer){
      // console.log(layer);
      basemap.bringToBack();
    });    
  } // end initMap()

  var resetMap = function() {
    if (addressMarker) {
      el.map.removeLayer(addressMarker);
    }
    el.map.setView([40.7127, -74.0059], 12);
  }

  function init() {
    el = app.ui.el;
    f = app.ui.f
    initMap();
  }

  return {
    init : init,
    geoclient : geoclient,
    resetMap : resetMap
  }

})(window, document, aja);