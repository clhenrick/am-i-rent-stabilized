// main variables
var  yes = $('#yes'),
      no = $('#no'),
      form = $('#form'),
      submit = $('#submit'),
      // url to cartodb sql api
      cdbURL = "http://chenrick.cartodb.com/api/v2/sql?q=",
      // bounding box for nyc to improve geocoder results
      bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.4959961, -74.2590879), //sw
            new google.maps.LatLng(40.91525559999999, -73.7002721) //ne
            ),
      // use google maps api geocoder
      geocoder = new google.maps.Geocoder();

// if the results of the CDB SQL query have a row then yes else no
var checkData = function(json) {  
  if (json.rows.length !==0) {    
    console.log('yay!');
    form.addClass('hidden');
    yes.removeClass('hidden');
  } else {
    console.log('boo!');
    form.addClass('hidden');
    no.removeClass('hidden');
  }
}

// geocode the user input
var geocodeAddress = function(address) {
        geocoder.geocode({ 'address': address, 'bounds' : bounds }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var geo = results[0].address_components[0].long_name + ' ' + 
                          results[0].address_components[1].long_name;
          var lonLat = results[0].geometry.location.B + ' ' + results[0].geometry.location.k;
          console.log('gecoder results: ', results);
          console.log('lonLat: ', lonLat)
          console.log('address to pass: ', geo);
          //checkAddress(geo);
          checkAddress(lonLat);
        };
      });
  };

// check the address using a longitude and latitude coordinates with a PostGIS SQL query
var checkAddress = function(lonLat) {
  var sql = "SELECT * FROM nyc_likely_rent_stabilized where " +
                 "ST_Intersects(ST_GeomFromText('Point(" +
                        lonLat + ")',4326), the_geom)";
  
  console.log('the sql: ', sql);

  $.getJSON(cdbURL + sql, function(data) {
      console.log('data: ', data);
      checkData(data);
  });
};

// when user clicks the submit button fire the app!
submit.on('click', function(){
  var streetAddress = $('#address').val(),
        boro = $('#boro').val(),
        fullAddress = streetAddress + ', ' + boro + ', NY'

  console.log('address is: ', fullAddress );
  geocodeAddress(fullAddress);
});

/*** scratch code ***/
// test out geocoding some addresses from the console...
var testGeocode = function(testAddress) {
  geocoder.geocode({'address' : testAddress, 'bounds' : bounds}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('test geocode results: ', results);

      var resultBounds = new google.maps.LatLngBounds(
          results[0].geometry.viewport.getSouthWest(), 
          results[0].geometry.viewport.getNorthEast()
      );

      console.log('test geocode result bounds: ', resultBounds);

    }
  });
};
