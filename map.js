// map & cartodb stuff
var app = app || {};

app.map = (function(w,d,$){   
   var map,
     addressMarker,
     sqlURL = "http://chenrick.cartodb.com/api/v2/sql?q=";  

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

      // console.log('the concatenated url is: ', urlConcat);
      
      $.ajax({
        dataType : "jsonp",
        url : urlConcat,
        success : function(data, status) {
          console.log('geoclient data: ', data);
          checkResult(data);
        },
        error: function(xhr, textStatus, err) { 
            console.log("readyState: "+xhr.readyState+"\n xhrStatus: "+xhr.status);
            console.log("responseText: "+xhr.responseText);            
        }        
      });
  }

  var checkResult = function(data) {
          if (data.address.bbl) {
            var bbl = data.address.bbl;          
            getCDBdata(bbl);
            showMarker(data);
          } else {
            app.ui.goToSlide($('#slide-2'));
            alert('Sorry but we didn\'t recognize that address, please try again.');
          }     
  }

 // check the bbl number against the cartodb data
  var getCDBdata = function(bbl) {
    // sql to pass cartodb's sql api
    var sql = "SELECT * FROM all_nyc_likely_rent_stabl_merged " +
                  "WHERE bbl = " + bbl;

    $.getJSON(sqlURL + sql, function(data) {
        console.log('CDB data: ', data);
        checkData(data);
    });
  };

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(json) {      
    app.ui.toggleMessage();
    app.ui.goToSlide($('#slide-4'));
    // $('#map').toggleClass('hidden');
    // $('.map-message').toggleClass('hidden');    
    // if (json.rows.length !==0) {    
    //     console.log('yay!');
    //     showYes();
    //     hideNo();
    //   } 
    // else if  (json.rows.length ===0) {
    //     console.log('boo!');
    //     showNo();
    //     hideYes();      
    //   }
  }

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
      map.removeLayer(addressMarker);
    }
    // add a marker and pan and zoom the map to it
    addressMarker = new L.marker(latlng).addTo(map);
    addressMarker.on('popupopen', function(e){
      console.log('marker pop up open: ', e);
      map.setView(latlng, 17);  
    }); 
    addressMarker.bindPopup("<h4>" + address + "</h4>" ).openPopup();   
  }

  // set up the leaflet / cartodb map
  var initMap = function() {
    map = new L.Map('map', {
      center : [40.7127, -74.0059],
      zoom : 10,
      dragging : false,
      touchZoom : false,
      doubleClickZoom : false,
      scrollWheelZoom : false,
      zoomControl : false
    });

    var tonerLite = new L.StamenTileLayer('toner-lite');
    map.addLayer(tonerLite);

    cartodb.createLayer(map, {
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
                          "line-width: 0.5;" +
                          "line-opacity: 0.2;" +
                        "}"
      }]
    })
    .addTo(map)
    .done(function(layer){
      // console.log(layer);
      tonerLite.bringToBack();
    });    

  } // end initMap()  

  return {
    initMap : initMap,
    geoclient : geoclient
  }

})(window, document, jQuery);
