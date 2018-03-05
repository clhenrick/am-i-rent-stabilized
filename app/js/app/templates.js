this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};
this["app"]["templates"]["how"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"../index.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li><a href=\"#how\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#code-data\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.code : stack1), depth0)) != null ? stack1 : "")
    + "</a></li>\n      <li><a href=\"#credits\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.credits : stack1), depth0))
    + "</a></li>\n    </ul>          \n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"how\"></a>\n  <h1> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h1 : stack1), depth0))
    + " </h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + " </strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + " </strong></p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <strong>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "</strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n  </p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyshcr.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "\n    </a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p05 : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "\n    </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://cdb.io/1CxBFB4\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1["3"] : stack1), depth0))
    + "\n    </a>\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p07 : stack1), depth0))
    + "\n  </p>\n  \n  <a name=\"code-data\"></a>\n  <h1>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.h1 : stack1), depth0)) != null ? stack1 : "")
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/am-i-rent-stabilized\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"http://chenrick.cartodb.com/tables/all_nyc_likely_rent_stabl_merged/public\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/dhcr-rent-stabilized-data\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n    </a></li>\n  </ul>\n  \n  <a name=\"credits\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p01 : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://carolinewoolard.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://radishlab.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://goodlemons.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1), depth0))
    + "\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://betanyc.us\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1), depth0))
    + "\n      </a>\n      "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1), depth0)) != null ? stack1 : "")
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cartodb.com\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["8"] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["9"] : stack1), depth0))
    + "\n   </li>\n  </ul>\n\n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1["0"] : stack1), depth0))
    + "\n    <a href=\"mailto:amirentstabilized@gmail.com\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1["1"] : stack1), depth0))
    + "\n    </a>\n  </p> \n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p03 : stack1), depth0))
    + "\n  </p>\n</div>";
},"useData":true});
this["app"]["templates"]["main"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"assets/png/logo.png\">\n  <h1>\n    <a class=\"go-first\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"info/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"info/how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"info/resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"mobile-message\">\n  <img src=\"assets/png/rotate.png\">\n  <h1>"
    + alias2(((helper = (helper = helpers.mobile_msg || (depth0 != null ? depth0.mobile_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mobile_msg","hash":{},"data":data}) : helper)))
    + "</h1>\n</div>\n\n<div class=\"lang-toggle desktop\">\n    <ul>\n        <li><a class=\"toggle-es\" href=\"#\"></a></li>\n        <li><p>•</p></li>\n        <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n    </ul>\n</div>\n\n<nav class=\"margin-circles\">\n    <ul>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n    </ul>\n</nav>\n\n<div class=\"slides-container\">\n    <div class=\"slide\" id=\"slide-1\">\n      <div class=\"lang-toggle mobile\">\n          <ul>\n              <li><a class=\"toggle-es\" href=\"#\"></a></li>\n              <li><p>•</p></li>\n              <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n          </ul>\n      </div>\n      <div class=\"centered\">\n          <img class=\"triple-s\" src=\"assets/png/triple-sss.png\">\n          <img class=\"building intro\" src=\"assets/png/building.png\">\n          <h1 class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n          <h2 class=\"sub-head\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h2 : stack1), depth0))
    + "</h2>\n          <p class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.landing : stack1), depth0))
    + "</p>\n          <p class=\"go-step4\"><a class=\"go-step4\" href=\"#\">\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.go_step_4 : stack1), depth0))
    + "\n          </a></p>\n      </div>\n      <div class=\"go-next bottom-arrow\">\n        <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.begin : stack1), depth0))
    + "</h3>\n        <div class=\"arrow\"></div>\n      </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-2\">\n      <div class=\"centered\">\n        <!-- <h4 class=\"step\">Step 1 of 5</h4> -->\n        <h1 class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n        <p class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.privacy : stack1), depth0))
    + "</p>\n\n        <form id=\"address-form\">\n          <div class=\"user-data street-address\">\n              <input class=\"address-input\" name=\"address-input\" type=\"text\" placeholder=\""
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + "\" tabindex=\"1\">\n          </div>\n          <div class=\"user-data borough-select\">\n              <span id=\"select-boro\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boro_select : stack1), depth0)) != null ? stack1 : "")
    + " </span>\n              <ul class=\"drop-down\" id=\"boroughs\">\n                <li><a data-boro=\"BX\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bx : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"BK\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bk : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"MN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.mn : stack1), depth0))
    + " </a></li>\n                <li><a data-boro=\"QN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.qn : stack1), depth0))
    + "  </a></li>\n                <li><a data-boro=\"SI\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.si : stack1), depth0))
    + "  </a></li>\n              </ul>\n          </div>\n          <ul class=\"validation-error\">\n            <li id=\"error-not-found\"  class=\"val-err vis-hidden\">"
    + ((stack1 = alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.not_found : stack1), depth0)) != null ? stack1 : "")
    + "</li>\n            <li id=\"error-address\" class=\"val-err vis-hidden\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + " </li>\n            <li id=\"error-boro\" class=\"val-err vis-hidden\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.boro : stack1), depth0))
    + " </li>\n          </ul>\n        </form>\n      </div>\n      <p class=\"button search\" type=\"submit\"><a href=\"#\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.search : stack1), depth0))
    + " </a></p>\n    </div>\n\n    <div class=\"slide\" id=\"slide-3\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"checking\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide03 : depth0)) != null ? stack1.checking : stack1), depth0))
    + " </h1>\n            <p> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide03 : depth0)) != null ? stack1.p : stack1), depth0))
    + " </p>\n            <div id=\"sprite\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-4\">\n        <div class=\"centered\">\n          <div class=\"yes hidden\">\n              <!-- <h1 class=\"news\">Good News!</h1> -->\n              <h1> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.yes : stack1)) != null ? stack1.h1 : stack1), depth0)) != null ? stack1 : "")
    + " </h1>\n              <p> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.yes : stack1)) != null ? stack1.p : stack1), depth0)) != null ? stack1 : "")
    + " </p>\n          </div>\n\n          <div class=\"no\">\n              <!-- <h1 class=\"news\">Sorry!</h1> -->\n              <p> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.no : stack1)) != null ? stack1.p : stack1), depth0)) != null ? stack1 : "")
    + " </p>\n          </div>\n\n          <div id=\"map-container\">\n              <div id=\"map\"></div>\n              <p class=\"map-message\"> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.map : stack1)) != null ? stack1.caption : stack1), depth0))
    + " </p>\n              <p class=\"map-message\"><a href=\"https://chenrick.carto.com/viz/c591fa2e-726b-11e6-83e8-0e05a8b3e3d7/public_map\" target=\"_blank\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.map : stack1)) != null ? stack1.view_map : stack1), depth0))
    + "</a></p>\n          </div>\n        </div>\n\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-5\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 2 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <div class=\"dhcr-choice\">\n              <p><a id=\"mail-to\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mail : stack1), depth0))
    + "</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.phone : stack1), depth0))
    + "<br><a href=\"tel:1-718-739-6400\">718 739-6400</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.visit : stack1), depth0))
    + "<br><a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.office : stack1), depth0))
    + "</a></p>\n            </div>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.tell_them : stack1), depth0))
    + "</p>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mailed : stack1), depth0))
    + "</p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-6\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 3 of 5</h4> -->\n            <h1 class=\"check-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <p class=\"check-it\">\n              <span class=\"addtocalendar atc-style-menu-wb\" id=\"atc_text_link\">\n                <a class=\"atcb-link\" id=\"atc_text_link_link\" href=\"#\" tabindex=\"-1\"></a><br>\n              </span>\n            </p>\n            <p class=\"check-it\">\n               "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.arrive : stack1), depth0))
    + "\n            </p>\n            <p class=\"check-it\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.friends : stack1), depth0))
    + "\n            </p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-7\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 4 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <a href=\"#rent-history\">\n              <img class=\"rent-history\" src=\"assets/png/sample-rent-history-thumb.png\">\n            </a>\n            <p class=\"view-sample\"><a href=\"#rent-history\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n            </a></p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-8\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 5 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <!-- <img class=\"mascot monster\" src=\"assets/png/no1.png\"> -->\n            <div class=\"action-choice\">\n              <h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.option01 : stack1), depth0))
    + "</h4>\n              <p class=\"no-local-tr\">\n                 <a href=\"info/resources.html\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.no_local_tr : stack1)) != null ? stack1.a : stack1), depth0))
    + "</a>\n                 "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.no_local_tr : stack1)) != null ? stack1.p : stack1), depth0))
    + "\n              </p>\n\n              <p class=\"yes-local-tr hidden\">\n                "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.yes_local_tr : stack1)) != null ? stack1.p : stack1), depth0))
    + "\n                <a href=\"#open-modal\"> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.yes_local_tr : stack1)) != null ? stack1.a : stack1), depth0))
    + " </a>\n              </p>\n\n              <h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.option02 : stack1), depth0))
    + "</h4>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n                <a href=\"http://www.nyshcr.org/Forms/Rent/ra89.pdf\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.a : stack1), depth0))
    + "</a>\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.p2 : stack1), depth0))
    + "\n              </p>\n            </div>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-9\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"end\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <img class=\"mascot\" src=\"assets/png/yes.png\">\n            <!-- <p><span class=\"go-first\">Start Over</span></p> -->\n            <div class=\"button-holder\">\n              <p class=\"button start-over go-first\" type=\"submit\"><a href=\"#\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.start : stack1), depth0))
    + "</a></p>\n              <p class=\"button learn-more\" type=\"submit\"><a href=\"info/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.learn : stack1), depth0))
    + "</a></p>\n            </div>\n            <div class=\"share-box-end\">\n                <p class=\"share-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.share : stack1), depth0))
    + "</p>\n                <div class=\"addthis_sharing_toolbox\"></div>\n            </div>\n            <div class=\"button-holder\">\n                <p class=\"button rent-logic\" type=\"submit\"><a id=\"rent-logic\" target=\"_blank\" href=\"https://rentlogic.com\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.rent : stack1), depth0))
    + "</a></p>\n            </div>\n        </div>\n    </div>\n</div> <!-- end slides container -->\n<script src=\"//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-551311020cabbff0\" async=\"async\"></script>\n";
},"useData":true});
this["app"]["templates"]["resources"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>\n    <a class=\"go-first\" href=\"../index.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li>\n        <a class=\"responsive-turn-off\" href=\"#non-gov\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.nongov : stack1), depth0))
    + "</a>\n        <ul>\n          <li><a href=\"#city-wide\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.citywide : stack1), depth0))
    + "</a></li>\n          <li><a href=\"#boro\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.boro : stack1), depth0))
    + "</a></li>\n          <li class=\"responsive\"><a href=\"#hood\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.hood : stack1), depth0))
    + "</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#gov\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.gov : stack1), depth0))
    + "</a></li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"non-gov\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</p>\n  <a name=\"city-wide\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.p01 : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.aafe.org\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.anhd.org\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cuffh.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.eisny.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.maketheroadny.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://metcouncilonhousing.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.mfy.org/projects\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.picturethehomeless.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"https://rentlogic.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["8"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["8"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://righttothecity.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["9"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["9"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://stabilizingnyc.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["10"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["10"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.tenantsandneighbors.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["11"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["11"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.uhab.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["12"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["12"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n\n  <a name=\"boro\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://brooklynhousing.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.bronxshepherds.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.bka.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://queenscommunityhouse.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li><a target=\"_blank\" href=\"www.nhsofsi.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n\n  <a name=\"hood\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.carrollgardensassociation.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"https://coopersquare.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://crownheightstenantunion.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.enyuyc.net\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.ebofb.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fifthave.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fdconline.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://mvdc.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nhsnyc.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["8"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["8"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://NWBcommunity.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["9"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["9"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"www.prattarea.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["10"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["10"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://stnicksalliance.org/SNA/#\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["11"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["11"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.unhp.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["12"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["12"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.whedco.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["13"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1["13"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n\n  <a name=\"gov\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h1>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nyshcr.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://a836-acris.nyc.gov/CP/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nyc.gov/html/dob/html/bis/bis.shtml\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/nyc-resources/service/1522/disability-rent-increase-exemption-drie-program\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["3"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"https://a806-housingconnect.nyc.gov/nyclottery/lottery.html#home\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["4"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/hpd/index.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a target=\"_blank\" href=\"https://hpdonline.hpdnyc.org/HPDonline/provide_address.aspx\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["5"] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://nycrgb.org/html/resources/resources.html\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["6"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/nyc-resources/service/2424/senior-citizen-rent-increase-exemption-scrie\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n</div>\n";
},"useData":true});
this["app"]["templates"]["why"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"../index.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>\n  </ul>\n</nav>\n\n<div id=\"left\">\n  <div class=\"lang-toggle\">\n      <ul>\n          <li><a class=\"toggle-es\" href=\"#\">en español</a></li>\n          <li><p>•</p></li>\n          <li><a class=\"toggle-zh\" href=\"#\">中文</a></li>\n      </ul>\n  </div>\n\n  <div id=\"side-nav\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n    <ul>\n      <li><a href=\"#why\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#what\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.what : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#under-attack\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.under : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#messed-up\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.messed : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#videos\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.videos : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#get-involved\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.involved : stack1), depth0))
    + "</a></li>\n      <li><a href=\"#not-rs\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_side : depth0)) != null ? stack1.not : stack1), depth0))
    + "</a></li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"main\">\n  <a name=\"why\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <h3 class=\"italic\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.facts : stack1), depth0))
    + "</h3>\n  \n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.one : stack1), depth0))
    + "</li>\n    <li>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.two : stack1), depth0)) != null ? stack1 : "")
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.three : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.why : depth0)) != null ? stack1.four : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"what\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n    <a href=\"http://www.dnainfo.com/new-york/20150302/hamilton-heights/landlord-owes-tenant-112000-after-overcharging-him-for-years\" target=\"_blank\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.what : depth0)) != null ? stack1.a : stack1), depth0))
    + "\n    </a>\n  </p>\n  \n  <a name=\"under-attack\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.methods : stack1), depth0))
    + "</h3>\n\n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.one : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.two : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.under : depth0)) != null ? stack1.three : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"messed-up\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p1 : stack1), depth0))
    + "\n    <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p1_s : stack1), depth0))
    + "</strong>\n  <p/>\n\n  <a name=\"videos\"></a>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p2 : stack1), depth0))
    + "\n    <a href=\"http://projects.studio20nyu.org/ny-tenants/\" target=\"_blank\">\n      "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.a : stack1), depth0))
    + "\n    </a>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.messed : depth0)) != null ? stack1.p3 : stack1), depth0))
    + "\n  </p>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.how : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/uvZWZy9uZqA\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.what : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/9MB-BhoUXg4\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.bronx : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/Yn8tj-8-TeE\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.bushwick : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/6oSbEpdL968\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n\n  <div class=\"video\">\n    <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.videos : depth0)) != null ? stack1.chinatown : stack1), depth0))
    + "</h3>\n    <iframe src=\"https://www.youtube.com/embed/TtZmANXveXg\" frameborder=\"0\" allowfullscreen></iframe>\n  </div>\n  \n  <a name=\"get-involved\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <ul>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.first : stack1), depth0))
    + "\n      <a href=\"./resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.a : stack1), depth0))
    + "</a>\n    </li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.second : stack1), depth0))
    + "</li>\n    <li>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.get_involved : depth0)) != null ? stack1.third : stack1), depth0))
    + "</li>\n  </ul>\n  \n  <a name=\"not-rs\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  \n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  \n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.one : stack1), depth0))
    + "\n    <a href=\"http://thebillfold.com/2012/08/how-to-negotiate-a-lease-renewal/\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.a : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p1 : stack1)) != null ? stack1.two : stack1), depth0))
    + "\n  </p> \n  \n  <p>\n    <strong>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.s : stack1), depth0))
    + "</strong>\n    <a href=\"http://www1.nyc.gov/311/index.page\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.a1 : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.two : stack1), depth0))
    + "\n    <a href=\"./resources.html\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.a2 : stack1), depth0))
    + "</a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.not_rs : depth0)) != null ? stack1.p2 : stack1)) != null ? stack1.three : stack1), depth0))
    + "\n  </p>\n</div>     ";
},"useData":true});