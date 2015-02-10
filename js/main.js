$(window).on('load', function(){
 
  // main variables
  var $w = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $section = $('section'),
        $arrow = $('p.arrow a'),        
        $yes = $('.yes'),
        $no = $('.no'),
        $cheating = $('.cheating'),
        $form = $('#form'),
        $address = $('#address'),
        $boro = $('#boro'),
        $submit = $('#submit'),
        $startOver = $("a[href$='#top']"),        
        cdbURL = "http://chenrick.cartodb.com/api/v2/sql?q=", // url to cartodb sql api
        map,
        geocoderMarker,
        dhcrMessage;
    
    /********* UI Stuff *********/ 
    // center nav arrow on page load
    $arrow.offset({ left: ($w.width()/2) - ($arrow.width()/2) });
    $arrow.css('display', 'inline-block');

    // adjust dimensions and positioning when window size changes
    $(window).resize(function(){
      var hc = $(window).width()/2,
            aw = $arrow.width()/2.
            offset = hc - aw;
      
      // set the arrow offset to horizontally center and reveal it after
      $arrow.offset({ left : offset });      
      
      // set the wrapper and section width and height to that of the window's
      $wrapper.width($(window).width());
      $section.width($(window).width());
      $section.height($(window).height());
    });

    // hide arrows other than the first one for mobile
    if (($(window).width() > 300) &&  ($(window).width() < 420)) {
        $('p.arrow a:gt(0)').css('display', 'none');
    }

    // smooth scroll transition via CSS Tricks blog:
    // http://css-tricks.com/snippets/jquery/smooth-scrolling/
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

    // loading GIF
    $.fn.spin.presets.huge = {
        lines: 13, // The number of lines to draw
        length: 100, // The length of each line
        width: 40, // The line thickness
        radius: 100, // The radius of the inner circle
        corners: 0.5, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb or array of colors
        speed: 0.7, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'huge', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
      }

      $.fn.spin.presets.large = {
        lines: 11, 
        length: 70, 
        width: 30, 
        radius: 70, 
        corners: 0.5, 
        rotate: 0, 
        direction: 1, 
        color: '#fff', 
        speed: 0.7, 
        trail: 60, 
        shadow: false, 
        hwaccel: false, 
        className: 'large', 
        zIndex: 2e9, 
        top: '50%', 
        left: '50%' 
      } 

      $.fn.spin.presets.med = {
        lines: 11, 
        length: 40, 
        width: 20, 
        radius: 50, 
        corners: 0.5, 
        rotate: 0, 
        direction: 1, 
        color: '#fff', 
        speed: 0.7, 
        trail: 60, 
        shadow: false, 
        hwaccel: false, 
        className: 'large', 
        zIndex: 2e9, 
        top: '50%', 
        left: '50%' 
      }   

    $('#gif').spin('huge','#fff');

    if ($(window).width() <= 960 || $(window).height() <=770) {
      $('#gif').spin('large', '#fff');
    }

    if ($(window).width() <=600) {
      $('#gif').spin('med', '#fff');
    }    

    $startOver.on('click', function(){
      $address.val('');      
      $boro.val('select');
      if ($cheating.hasClass('hidden')) { $cheating.removeClass('hidden'); }
      hideYes();
      hideNo();

      if (geocoderMarker) { 
        map.removeLayer(geocoderMarker);
        map.setView([40.7127, -74.0059], 10);
      }
    });

  var showYes = function() {            
      if ($yes.hasClass('hidden')) { $yes.removeClass('hidden'); }
  }

  var hideYes = function() {
    if (! $yes.hasClass('hidden')) { $yes.addClass('hidden'); }
  }

  var showNo = function() {            
     if ($no.hasClass('hidden')) { $no.removeClass('hidden'); }
  }

  var hideNo = function() {
    if (! $no.hasClass('hidden')) { $no.addClass('hidden'); }
  }

  var createMailTo = function() {
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
     $('#mailto').attr('href',msg);
  }

  // when user clicks the $submit button fire the app!
  $submit.on('click', function(){
    var  streetAddress = $address.val(),
          boro = $boro.val(),          
          parsedStreetAddress = parseAddress.parseLocation(streetAddress),
          streetNum = parsedStreetAddress.number,
          streetAddress;

    // check the parsed street address 
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

    // console.log('streetAddress is: ', streetAddress, 
    //                   ' parsedStreetAddress is: ', parsedStreetAddress);
    geoclient(streetNum, streetAddress, boro);
  });  

  /******** Geocode User Input & Query DB ********/

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
          // console.log('ajax request body: ', data);
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
            showMarker(data)            
          } else {
            $cheating.addClass('hidden');
            $('a[href=#four]').trigger('click');            
            showNo();
            hideYes();              
          }       
  }

 // check the bbl number against the cartodb data
  var getCDBdata = function(bbl) {
    // sql to pass cartodb's sql api
    var sql = "SELECT * FROM all_nyc_likely_rent_stabl_merged " +
                  "WHERE bbl = " + bbl;
    
    // console.log('the sql: ', sql);

    $.getJSON(cdbURL + sql, function(data) {
        console.log('CDB data: ', data);
        checkData(data);
    });
  };

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(json) {  
    $cheating.addClass('hidden');
    $('a[href=#four]').trigger('click');

    if (json.rows.length !==0) {    
        console.log('yay!');
        showYes();
        hideNo();
      } 
    else if  (json.rows.length ===0) {
        console.log('boo!');
        showNo();
        hideYes();      
      }
  }

  var showMarker = function(data) {
    var x = data.address.longitudeInternalLabel,
          y = data.address.latitudeInternalLabel,
          latlng = [y, x],
          address = data.address.houseNumber + ' ' + 
                          data.address.firstStreetNameNormalized + '\n' +
                          data.address.uspsPreferredCityName + ', NY ' +
                          data.address.zipCode;
    // remove geocoded marker if one already exists
    if (geocoderMarker) { 
      map.removeLayer(geocoderMarker);
    }
    // add a marker and pan and zoom the map to it
    geocoderMarker = new L.marker(latlng).addTo(map);
    geocoderMarker.bindPopup("<h4>" + address + "</h4>" ).openPopup();
    map.setView(latlng, 17);       
  }

  /******** Map Stuff! ********/
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

  /******** Get it all Going ********/
  // fixes iOS viewport units issue
  window.viewportUnitsBuggyfill.init();
  createMailTo();
  initMap(); 
});