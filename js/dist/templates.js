this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};
this["app"]["templates"]["main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"../assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"#\">Am I Rent Stabilized?</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>            \n  </ul>\n</nav>\n\n<div id=\"mobile-message\">\n  <img src=\"../assets/png/rotate.png\">\n  <h1>"
    + alias2(((helper = (helper = helpers.mobile_msg || (depth0 != null ? depth0.mobile_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"mobile_msg","hash":{},"data":data}) : helper)))
    + "</h1>          \n</div>\n\n<div id=\"lang-toggle\">\n    <ul>\n        <li><a href=\"#\">en español</a></li>\n        <li><p>•</p></li>\n        <li><a href=\"#\">中文</a></li>\n<!--         <li><p>•</p></li>\n        <li><p><a href=\"#\">english</a></p></li> -->\n    </ul>\n</div>\n\n<nav class=\"margin-circles\">\n    <ul>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n    </ul>\n</nav>\n\n<div class=\"slides-container\">\n    <div class=\"slide\" id=\"slide-1\">\n        <div class=\"centered\"> \n            <img class=\"triple-s\" src=\"../assets/png/triple-sss.png\">              \n            <img class=\"building intro\" src=\"../assets/png/building.png\">\n            <h1 class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1> \n            <h2 class=\"sub-head\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h2 : stack1), depth0))
    + "</h2>\n            <p class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.landing : stack1), depth0))
    + "</p>\n            <p class=\"go-step4\"><a class=\"go-step4\" href=\"#\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.go_step_4 : stack1), depth0))
    + "\n            </a></p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.begin : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>  \n    </div>\n\n    <div class=\"slide\" id=\"slide-2\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 1 of 5</h4> -->\n            <h1 class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <p class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.privacy : stack1), depth0))
    + "</p>\n\n            <form id=\"address-form\">\n                <ul class=\"validation-error\">\n                    <li id=\"error-not-found\"  class=\"vis-hidden\">\n                      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.not_found : stack1), depth0))
    + "\n                    </li>\n                </ul>                      \n                <div class=\"user-data street-address\">\n                    <input class=\"address-input\" name=\"address-input\" type=\"text\" placeholder=\""
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + "\" tabindex=\"1\">\n                </div>                        \n                <div class=\"user-data borough-select\">\n                    <span id=\"select-boro\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boro_select : stack1), depth0)) != null ? stack1 : "")
    + " </span>\n                    <ul class=\"drop-down\" id=\"boroughs\">\n                      <li><a data-boro=\"BX\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bx : stack1), depth0))
    + " </a></li>\n                      <li><a data-boro=\"BK\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.bk : stack1), depth0))
    + " </a></li>\n                      <li><a data-boro=\"MN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.mn : stack1), depth0))
    + " </a></li>\n                      <li><a data-boro=\"QN\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.qn : stack1), depth0))
    + "  </a></li>\n                      <li><a data-boro=\"SI\" href=\"#\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.boroughs : stack1)) != null ? stack1.si : stack1), depth0))
    + "  </a></li>\n                    </ul>\n                </div>\n                <ul class=\"validation-error\">                            \n                    <li id=\"error-address\" class=\"vis-hidden\"> "
    + ((stack1 = alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + " </li>\n                    <li id=\"error-boro\" class=\"vis-hidden\"> "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.val_errors : stack1)) != null ? stack1.boro : stack1), depth0))
    + " </li>\n                </ul>                                                \n            </form>                       \n        </div>\n        <p class=\"button search\" type=\"submit\"><a href=\"#\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.search : stack1), depth0))
    + " </a></p>\n    </div>  \n\n    <div class=\"slide\" id=\"slide-3\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"checking\"> "
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
    + " </p>\n              <p class=\"map-message\"><a href=\"http://cdb.io/1CvSBy7\" target=\"_blank\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide04 : depth0)) != null ? stack1.map : stack1)) != null ? stack1.view_map : stack1), depth0))
    + "</a></p>\n          </div>                                    \n        </div>\n\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>        \n\n    <div class=\"slide\" id=\"slide-5\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 2 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <div class=\"dhcr-choice\">\n              <p><a id=\"mail-to\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mail : stack1), depth0))
    + "</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.phone : stack1), depth0))
    + "<br><a href=\"tel:1-718-739-6400\">718 739-6400</a></p>\n              <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.visit : stack1), depth0))
    + "<br><a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.office : stack1), depth0))
    + "</a></p>                      \n            </div>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.tell_them : stack1), depth0))
    + "</p>\n            <p class=\"be-sure\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide05 : depth0)) != null ? stack1.mailed : stack1), depth0))
    + "</p>\n        </div>                \n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-6\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 3 of 5</h4> -->\n            <h1 class=\"check-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <p class=\"check-it\">\n              <span class=\"addtocalendar atc-style-menu-wb\" id=\"atc_text_link\">\n                <a class=\"atcb-link\" id=\"atc_text_link_link\" href=\"#\" tabindex=\"-1\"></a><br> \n              </span>\n            </p>\n            <p class=\"check-it\">\n               "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.arrive : stack1), depth0))
    + "\n            </p>\n            <p class=\"check-it\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide06 : depth0)) != null ? stack1.friends : stack1), depth0))
    + "\n            </p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>\n\n    <div class=\"slide\" id=\"slide-7\">                \n        <div class=\"centered\">                    \n            <!-- <h4 class=\"step\">Step 4 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <a href=\"#rent-history\">\n              <img class=\"rent-history\" src=\"../assets/png/sample-rent-history-thumb.png\">\n            </a>\n            <p class=\"view-sample\"><a href=\"#rent-history\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n            </a></p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>   \n\n    <div class=\"slide\" id=\"slide-8\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 5 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <!-- <img class=\"mascot monster\" src=\"../assets/png/no1.png\"> -->\n            <div class=\"action-choice\">                      \n              <h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.option01 : stack1), depth0))
    + "</h4>\n              <p class=\"no-local-tr\">\n                 <a href=\"html/resources.html\">"
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
    + "\n              </p>\n            </div>                    \n        </div>                \n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>    \n\n    <div class=\"slide\" id=\"slide-9\">\n        <div class=\"centered v-centered\">\n            <h1 class=\"end\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <img class=\"mascot\" src=\"../assets/png/yes.png\">\n            <!-- <p><span class=\"go-first\">Start Over</span></p> -->\n            <div class=\"button-holder\">\n              <p class=\"button start-over go-first\" type=\"submit\"><a href=\"#\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.start : stack1), depth0))
    + "</a></p>\n              <p class=\"button learn-more\" type=\"submit\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.learn : stack1), depth0))
    + "</a></p>\n            </div>\n            <div class=\"share-box-end\">\n                <p class=\"share-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.share : stack1), depth0))
    + "</p>\n                <div class=\"addthis_sharing_toolbox\"></div> \n            </div>                                    \n        </div>\n    </div>                        \n</div> <!-- end slides container -->";
},"useData":true});