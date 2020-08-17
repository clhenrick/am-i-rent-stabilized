// map & cartodb stuff
var app = app || {};

app.map = (function (d, w, a, H, $) {
  var el = {}, // to store DOM element references from app.ui
    f = {}, // to store DOM manipulation and UI functions from app.ui
    state = app.s,
    addressMarker, // leaflet marker to locate user's address on map
    sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
    g = {}, // to store properties from NYC Geoclient API result
    source = d.getElementById("org-template").innerHTML,
    template = H.compile(source),
    hbData = { orgs: [] };

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

  app.events.subscribe("state-updated", function (updatedState) {
    state = updatedState;
  });

  function mapfns() {
    function getJSON(url, type, callback) {
      a()
        .url(url)
        .type(type)
        .on("success", function (data) {
          callback(data);
          // console.log('getJSON data: ', data);
        })
        .on("error", function (err) {
          // callback('error');
        })
        .go();
    }

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
        _gaq.push([
          "_trackEvent",
          "Geoclient Success",
          "Result",
          gcr_stringify,
        ]);

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
          document.getElementById("rent-logic").href =
            "http://www.rentlogic.com";
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

    // if the results of the CDB SQL query have a row then show yes else display no
    function checkData(data) {
      // console.log('cdb data: ', data);
      if (data.rows.length > 0 && state.yesNoState === false) {
        // console.log('bbl match!');
        var bbl_match = JSON.stringify(data.rows[0].bbl);
        _gaq.push(["_trackEvent", "CDB", "Match", bbl_match]);
        app.f.toggleClass(app.el.yes, "hidden");
        app.f.toggleClass(app.el.no, "hidden");
        app.events.publish("state-change", { yesNoState: true });
      }
      app.f.goToNextSlide();
      // console.log('checkData goToNextSlide called');
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

    app.map.fns = {
      geoclient: geoclient,
      showMarker: showMarker,
    };

    return app.map.fns;
  } // end mapfns

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
  }; // end init()

  var resetMap = function () {
    if (addressMarker) {
      app.el.map.removeLayer(addressMarker);
    }
    app.el.map.setView([40.7127, -74.0059], 12);
  };

  function init() {
    el = app.el;
    f = app.f;
    state = app.s;
    mapfns();
    initMap();
  }

  return {
    init: init,
    resetMap: resetMap,
  };
})(document, window, aja, Handlebars, jQuery);
