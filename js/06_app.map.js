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
      getCDBdata(bbl);
      showMarker(data);

    } else {      

      el.addressInput.value='';
      f.resetBoroValue();      
      if (f.hasClass(el.valErrorNF, 'vis-hidden')===true) {
        f.toggleClass(el.valErrorNF, 'vis-hidden');
      }
      if (f.hasClass(el.valErrorBoro, 'vis-hidden')===false) {
        f.addClass(el.valErrorBoro, 'vis-hidden');
      }
      if (f.hasClass(el.valErrorAddress, 'vis-hidden')===false) {
        f.addClass(el.valErrorAddress, 'vis-hidden');
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
      app.f.toggleClass(el.yes, 'hidden');
      app.f.toggleClass(el.no, 'hidden');
      app.events.publish('state-change', { yesNoState : true });            
    } 

    f.goToNextSlide();
  }

  function checkTR(data) {
    if (data.rows.length > 0) {
      f.addClass(noTR, 'hidden');
      f.removeClass(yesTR, 'hidden');
      
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
    // remove geocoded marker if one already exists
    if (addressMarker) { 
      el.map.removeLayer(addressMarker);
    }
    // add a marker and pan and zoom the el.map to it
    addressMarker = new L.marker(latlng).addTo(el.map);
    addressMarker.on('popupopen', function(e){
      el.map.setView(latlng, 16);  
    }); 
    addressMarker.bindPopup("<b>" + address + "</b>").openPopup();   
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

    el.map.addLayer(basemap);

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
      
      el.map.addLayer(layer, false);
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
      el.map.removeLayer(addressMarker);
    }
    el.map.setView([40.7127, -74.0059], 12);
  };

  function init() {
    el = app.elem;
    f = app.fns;
    state = app.s;
    initMap();
  }

  return   {
    init : init,
    geoclient : geoclient,
    resetMap : resetMap
  };

})(document, window, aja, Handlebars, jQuery);