/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.Handlebars=b():a.Handlebars=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(){var a=new g.HandlebarsEnvironment;return m.extend(a,g),a.SafeString=i["default"],a.Exception=k["default"],a.Utils=m,a.escapeExpression=m.escapeExpression,a.VM=o,a.template=function(b){return o.template(b,a)},a}var e=c(7)["default"];b.__esModule=!0;var f=c(1),g=e(f),h=c(2),i=e(h),j=c(3),k=e(j),l=c(4),m=e(l),n=c(5),o=e(n),p=c(6),q=e(p),r=d();r.create=d,q["default"](r),r["default"]=r,b["default"]=r,a.exports=b["default"]},function(a,b,c){"use strict";function d(a,b){this.helpers=a||{},this.partials=b||{},e(this)}function e(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new k["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(o(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=f(c.data);g.contextPath=i.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){function c(b,c,e){j&&(j.key=b,j.index=c,j.first=0===c,j.last=!!e,l&&(j.contextPath=l+b)),h+=d(a[b],{data:j,blockParams:i.blockParams([a[b],b],[l+b,null])})}if(!b)throw new k["default"]("Must pass iterator to #each");var d=b.fn,e=b.inverse,g=0,h="",j=void 0,l=void 0;if(b.data&&b.ids&&(l=i.appendContextPath(b.data.contextPath,b.ids[0])+"."),p(a)&&(a=a.call(this)),b.data&&(j=f(b.data)),a&&"object"==typeof a)if(o(a))for(var m=a.length;m>g;g++)c(g,g,g===a.length-1);else{var n=void 0;for(var q in a)a.hasOwnProperty(q)&&(n&&c(n,g-1),n=q,g++);n&&c(n,g-1,!0)}return 0===g&&(h=e(this)),h}),a.registerHelper("if",function(a,b){return p(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||i.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){p(a)&&(a=a.call(this));var c=b.fn;if(i.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=f(b.data);d.contextPath=i.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}function f(a){var b=i.extend({},a);return b._parent=a,b}var g=c(7)["default"];b.__esModule=!0,b.HandlebarsEnvironment=d,b.createFrame=f;var h=c(4),i=g(h),j=c(3),k=g(j),l="3.0.1";b.VERSION=l;var m=6;b.COMPILER_REVISION=m;var n={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};b.REVISION_CHANGES=n;var o=i.isArray,p=i.isFunction,q=i.toString,r="[object Object]";d.prototype={constructor:d,logger:s,log:t,registerHelper:function(a,b){if(q.call(a)===r){if(b)throw new k["default"]("Arg not supported with multiple helpers");i.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){if(q.call(a)===r)i.extend(this.partials,a);else{if("undefined"==typeof b)throw new k["default"]("Attempting to register a partial as undefined");this.partials[a]=b}},unregisterPartial:function(a){delete this.partials[a]}};var s={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(a,b){if("undefined"!=typeof console&&s.level<=a){var c=s.methodMap[a];(console[c]||console.log).call(console,b)}}};b.logger=s;var t=s.log;b.log=t},function(a,b){"use strict";function c(a){this.string=a}b.__esModule=!0,c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c),e&&(this.lineNumber=f,this.column=g)}b.__esModule=!0;var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a){return j[a]}function d(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function e(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function f(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return l.test(a)?a.replace(k,c):a}function g(a){return a||0===a?o(a)&&0===a.length?!0:!1:!0}function h(a,b){return a.path=b,a}function i(a,b){return(a?a+".":"")+b}b.__esModule=!0,b.extend=d,b.indexOf=e,b.escapeExpression=f,b.isEmpty=g,b.blockParams=h,b.appendContextPath=i;var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k=/[&<>"'`]/g,l=/[&<>"'`]/,m=Object.prototype.toString;b.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(b.isFunction=n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)});var n;b.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};b.isArray=o},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=p.COMPILER_REVISION;if(b!==c){if(c>b){var d=p.REVISION_CHANGES[c],e=p.REVISION_CHANGES[b];throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){function c(c,d,e){e.hash&&(d=m.extend({},d,e.hash)),c=b.VM.resolvePartial.call(this,c,d,e);var f=b.VM.invokePartial.call(this,c,d,e);if(null==f&&b.compile&&(e.partials[e.name]=b.compile(c,a.compilerOptions,b),f=e.partials[e.name](d,e)),null!=f){if(e.indent){for(var g=f.split("\n"),h=0,i=g.length;i>h&&(g[h]||h+1!==i);h++)g[h]=e.indent+g[h];f=g.join("\n")}return f}throw new o["default"]("The partial "+e.name+" could not be compiled when running in runtime-only mode")}function d(b){var c=void 0===arguments[1]?{}:arguments[1],f=c.data;d._setup(c),!c.partial&&a.useData&&(f=j(b,f));var g=void 0,h=a.useBlockParams?[]:void 0;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(e,b,e.helpers,e.partials,f,h,g)}if(!b)throw new o["default"]("No environment passed to template");if(!a||!a.main)throw new o["default"]("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var e={strict:function(a,b){if(!(b in a))throw new o["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:m.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c,d,e){var g=this.programs[a],h=this.fn(a);return b||e||d||c?g=f(this,a,h,b,c,d,e):g||(g=this.programs[a]=f(this,a,h)),g},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=m.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler};return d.isTop=!0,d._setup=function(c){c.partial?(e.helpers=c.helpers,e.partials=c.partials):(e.helpers=e.merge(c.helpers,b.helpers),a.usePartial&&(e.partials=e.merge(c.partials,b.partials)))},d._child=function(b,c,d,g){if(a.useBlockParams&&!d)throw new o["default"]("must pass block params");if(a.useDepths&&!g)throw new o["default"]("must pass parent depths");return f(e,b,a[b],c,0,d,g)},d}function f(a,b,c,d,e,f,g){function h(b){var e=void 0===arguments[1]?{}:arguments[1];return c.call(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),g&&[b].concat(g))}return h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function g(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a=c.partials[c.name],a}function h(a,b,c){if(c.partial=!0,void 0===a)throw new o["default"]("The partial "+c.name+" could not be found");return a instanceof Function?a(b,c):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?p.createFrame(b):{},b.root=a),b}var k=c(7)["default"];b.__esModule=!0,b.checkRevision=d,b.template=e,b.wrapProgram=f,b.resolvePartial=g,b.invokePartial=h,b.noop=i;var l=c(4),m=k(l),n=c(3),o=k(n),p=c(1)},function(a,b){(function(c){"use strict";b.__esModule=!0,b["default"]=function(a){var b="undefined"!=typeof c?c:window,d=b.Handlebars;a.noConflict=function(){b.Handlebars===a&&(b.Handlebars=d)}},a.exports=b["default"]}).call(b,function(){return this}())},function(a,b){"use strict";b["default"]=function(a){return a&&a.__esModule?a:{"default":a}},b.__esModule=!0}])});
this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};
this["app"]["templates"]["how"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

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
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + " </strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p01 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + " </strong></p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <strong>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "</strong>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p03 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.h3 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyshcr.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p04 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p05 : stack1), depth0))
    + "\n  </p>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n    <a target=\"_blank\" href=\"http://cdb.io/1CxBFB4\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p06 : stack1)) != null ? stack1['3'] : stack1), depth0))
    + "\n    </a>\n  </p>\n\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.how : depth0)) != null ? stack1.p07 : stack1), depth0))
    + "\n  </p>\n  \n  <a name=\"code-data\"></a>\n  <h1>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.h1 : stack1), depth0)) != null ? stack1 : "")
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/am-i-rent-stabilized\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"http://chenrick.cartodb.com/tables/all_nyc_likely_rent_stabl_merged/public\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a></li>\n    <li><a target=\"_blank\" href=\"https://github.com/clhenrick/dhcr-rent-stabilized-data\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.code : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n    </a></li>\n  </ul>\n  \n  <a name=\"credits\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p01 : stack1), depth0))
    + "\n  </p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://carolinewoolard.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://radishlab.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1), depth0))
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://goodlemons.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1), depth0))
    + "\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://betanyc.us\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1), depth0))
    + "\n      </a>\n      "
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1), depth0)) != null ? stack1 : "")
    + "\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cartodb.com\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1), depth0))
    + "\n      </a>\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1), depth0))
    + "\n   </li>\n  </ul>\n\n  <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>\n    "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['0'] : stack1), depth0))
    + "\n    <a href=\"mailto:amirentstabilized@gmail.com\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p02 : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "\n    </a>\n  </p> \n  <p>\n    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.credits : depth0)) != null ? stack1.p03 : stack1), depth0))
    + "\n  </p>\n</div>";
},"useData":true});
this["app"]["templates"]["main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "<nav class=\"main-nav\">\n  <img class=\"logo\" src=\"assets/png/logo.png\">\n  <h1>            \n    <a class=\"go-first\" href=\"#\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n  </h1>\n  <div class=\"burger\" alt=\"-\"></div>\n  <ul>\n    <li class=\"nav\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.why : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/how.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.how : stack1), depth0))
    + "</a></li>\n    <li class=\"nav\"><a href=\"html/resources.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_main : depth0)) != null ? stack1.resources : stack1), depth0))
    + "</a></li>            \n  </ul>\n</nav>\n\n<div id=\"mobile-message\">\n  <img src=\"assets/png/rotate.png\">\n  <h1>"
    + alias2(((helper = (helper = helpers.mobile_msg || (depth0 != null ? depth0.mobile_msg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"mobile_msg","hash":{},"data":data}) : helper)))
    + "</h1>          \n</div>\n\n<div class=\"lang-toggle desktop\">\n    <ul>\n        <li><a class=\"toggle-es\" href=\"#\"></a></li>\n        <li><p>•</p></li>\n        <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n    </ul>\n</div>\n\n<nav class=\"margin-circles\">\n    <ul>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n        <li></li>\n    </ul>\n</nav>\n\n<div class=\"slides-container\">\n    <div class=\"slide\" id=\"slide-1\">\n      <div class=\"lang-toggle mobile\">\n          <ul>\n              <li><a class=\"toggle-es\" href=\"#\"></a></li>\n              <li><p>•</p></li>\n              <li><a class=\"toggle-zh\" href=\"#\"></a></li>\n          </ul>\n      </div>      \n      <div class=\"centered\"> \n          <img class=\"triple-s\" src=\"assets/png/triple-sss.png\">              \n          <img class=\"building intro\" src=\"assets/png/building.png\">\n          <h1 class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1> \n          <h2 class=\"sub-head\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.h2 : stack1), depth0))
    + "</h2>\n          <p class=\"landing\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.landing : stack1), depth0))
    + "</p>\n          <p class=\"go-step4\"><a class=\"go-step4\" href=\"#\">\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide01 : depth0)) != null ? stack1.go_step_4 : stack1), depth0))
    + "\n          </a></p>\n      </div>\n      <div class=\"go-next bottom-arrow\">\n        <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.begin : stack1), depth0))
    + "</h3>\n        <div class=\"arrow\"></div>\n      </div>  \n    </div>\n\n    <div class=\"slide\" id=\"slide-2\">\n      <div class=\"centered\">\n        <!-- <h4 class=\"step\">Step 1 of 5</h4> -->\n        <h1 class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n        <p class=\"step\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.privacy : stack1), depth0))
    + "</p>\n\n        <form id=\"address-form\">                    \n          <div class=\"user-data street-address\">\n              <input class=\"address-input\" name=\"address-input\" type=\"text\" placeholder=\""
    + ((stack1 = alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.slide02 : depth0)) != null ? stack1.form : stack1)) != null ? stack1.address : stack1), depth0)) != null ? stack1 : "")
    + "\" tabindex=\"1\">\n          </div>                        \n          <div class=\"user-data borough-select\">\n              <span id=\"select-boro\"> "
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
    + " </li>\n          </ul>                                                \n        </form>                       \n      </div>\n      <p class=\"button search\" type=\"submit\"><a href=\"#\"> "
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
    + "</h1>\n            <a href=\"#rent-history\">\n              <img class=\"rent-history\" src=\"assets/png/sample-rent-history-thumb.png\">\n            </a>\n            <p class=\"view-sample\"><a href=\"#rent-history\">\n              "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide07 : depth0)) != null ? stack1.p : stack1), depth0))
    + "\n            </a></p>\n        </div>\n        <div class=\"go-next bottom-arrow\">\n          <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nav_bottom_arrow : depth0)) != null ? stack1.next : stack1), depth0))
    + "</h3>\n          <div class=\"arrow\"></div>\n        </div>\n    </div>   \n\n    <div class=\"slide\" id=\"slide-8\">\n        <div class=\"centered\">\n            <!-- <h4 class=\"step\">Step 5 of 5</h4> -->\n            <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide08 : depth0)) != null ? stack1.h1 : stack1), depth0))
    + "</h1>\n            <!-- <img class=\"mascot monster\" src=\"assets/png/no1.png\"> -->\n            <div class=\"action-choice\">                      \n              <h4>"
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
    + "</h1>\n            <img class=\"mascot\" src=\"assets/png/yes.png\">\n            <!-- <p><span class=\"go-first\">Start Over</span></p> -->\n            <div class=\"button-holder\">\n              <p class=\"button start-over go-first\" type=\"submit\"><a href=\"#\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.start : stack1), depth0))
    + "</a></p>\n              <p class=\"button learn-more\" type=\"submit\"><a href=\"html/why.html\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.learn : stack1), depth0))
    + "</a></p>\n            </div>\n            <div class=\"share-box-end\">\n                <p class=\"share-it\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.slide09 : depth0)) != null ? stack1.share : stack1), depth0))
    + "</p>\n                <div class=\"addthis_sharing_toolbox\"></div> \n            </div>                                    \n        </div>\n    </div>                        \n</div> <!-- end slides container -->\n<script src=\"//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-551311020cabbff0\" async=\"async\"></script>";
},"useData":true});
this["app"]["templates"]["resources"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

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
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.anhd.org\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://cuffh.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.eisny.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.maketheroadny.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://metcouncilonhousing.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.mfy.org/projects\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n    </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.picturethehomeless.org/\">\n      "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://righttothecity.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.tenantsandneighbors.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"http://www.uhab.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.citywide : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n  \n  <a name=\"boro\"></a>          \n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a href=\"http://brooklynhousing.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.bronxshepherds.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>                        \n    <li>\n      <a target=\"_blank\" href=\"http://www.bka.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://queenscommunityhouse.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li><a target=\"_blank\" href=\"www.nhsofsi.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.boro : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n  \n  <a name=\"hood\"></a>\n  <h3>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.h3 : stack1), depth0))
    + "</h3>\n  <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.carrollgardensassociation.com/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>            \n    <li>\n      <a target=\"_blank\" href=\"https://coopersquare.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://crownheightstenantunion.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "        \n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.enyuyc.net\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.ebofb.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fifthave.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.fdconline.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://mvdc.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nhsnyc.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['8'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://NWBcommunity.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['9'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"www.prattarea.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['10'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://stnicksalliance.org/SNA/#\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['11'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['11'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.unhp.org/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['12'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['12'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www.whedco.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['13'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.nongov : depth0)) != null ? stack1.hood : stack1)) != null ? stack1.ul : stack1)) != null ? stack1['13'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>\n\n  <a name=\"gov\"></a>\n  <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.h3 : stack1), depth0))
    + "</h1>\n  <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.p : stack1), depth0))
    + "</p>\n  <ul>\n    <li>\n      <a target=\"_blank\" href=\"http://www.nyshcr.org\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a href=\"http://www.nyshcr.org/AboutUs/contact.htm#rent-admin\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://a836-acris.nyc.gov/CP/\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['1'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://www.nyc.gov/html/dob/html/bis/bis.shtml\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['2'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/finance/benefits/tenants-drie.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['3'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a href=\"https://a806-housingconnect.nyc.gov/nyclottery/lottery.html#home\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['4'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/hpd/index.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "\n        <a target=\"_blank\" href=\"https://hpdonline.hpdnyc.org/HPDonline/provide_address.aspx\">\n          "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['5'] : stack1)) != null ? stack1.a : stack1), depth0))
    + "\n        </a>\n      </p>\n    </li>          \n    <li>\n      <a target=\"_blank\" href=\"http://nycrgb.org/html/resources/resources.html\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['6'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n    <li>\n      <a target=\"_blank\" href=\"http://www1.nyc.gov/site/finance/benefits/tenants-scrie.page\">\n        "
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.org : stack1), depth0))
    + "\n      </a>\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.gov : depth0)) != null ? stack1.ul : stack1)) != null ? stack1['7'] : stack1)) != null ? stack1.desc : stack1), depth0))
    + "</p>\n    </li>\n  </ul>          \n</div>   ";
},"useData":true});
this["app"]["templates"]["why"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

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
var app = app || {};

app.language = (function(w,d,$) {
  // language toggle module
  // variables to reference the language toggle buttons
  var $es,
      $zh,
      $en;

  function loadTemplateData(lang, currentPage, callback){
    var template,
        html,
        filePath,
        contentFolder = 'data/';

    // set variables to the correct JSON file & template based on the app's current page
    if (currentPage === 'index') {      
      filePath = contentFolder + 'main-content.json';
      template = app.templates.main;
    } else if (currentPage === 'why') {
      filePath = '../' + contentFolder + 'why-content.json';
      template = app.templates.why;
    } else if (currentPage === 'how') {
      filePath = '../' + contentFolder + 'how-content.json';
      template = app.templates.how;
    } else if (currentPage === 'resources') {
      filePath = '../' + contentFolder + 'resources-content.json';
      template = app.templates.resources;
    }    
    
    $.getJSON(filePath, function(data) {
      // load the correct language from the json data
      if (lang === 'es') {
        html = template(data.languages.es);        
      } else if (lang === 'zh') {
        html = template(data.languages.zh);
      } else  {
        html = template(data.languages.en);
      }      
      d.querySelector('#wrapper').innerHTML = html;
      initLangButtons(); 
    })
    .done(function(){     
      if (currentPage === 'index') {
        app.init.init();
      } else {
        app.pages.toggleBurger();
      }  
      $es = $('.lang-toggle .toggle-es');
      $zh = $('.lang-toggle .toggle-zh');
      $en = $('.lang-toggle .toggle-en');
      changeLangButtons(lang);  
      if (callback && typeof callback === "function") { 
        callback();
      }           
    });
  }
  
  function langToggle(lang, callback) {
    // loads the correct lang json & template; 
    // this gets called when the page first loads and when the user clicks the lang button
    var curLang = w.localStorage.getItem('lang') || 'en';
    var currentPage = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.lastIndexOf('.'));
    
    if (['index', 'why', 'how', 'resources'].indexOf(currentPage) === -1) {
      currentPage = 'index';
    }

    loadTemplateData(curLang, currentPage);
  }

  function changeLangButtons(lang) {
    // change the language toggle buttons so the user can switch between them
    if (lang === "es") {  
      $es.html('in english');
      $es.removeClass('toggle-es').addClass('toggle-en');
      $zh.html('中文');
      $('body').addClass('es');
      $('body').removeClass('en');
      $('body').removeClass('zh');
    } else if (lang === "zh") {
      $es.html('en español');
      $zh.html('in english');
      $zh.removeClass('toggle-zh').addClass('toggle-en');
      $('body').addClass('zh');
      $('body').removeClass('es');
      $('body').removeClass('en');
    } else {
      $es.html('en español');
      $zh.html('中文');
      $('body').addClass('en');
      $('body').removeClass('es');
      $('body').removeClass('zh');
    }
  }

  function initLangButtons() {
    // add the event listener 
    $('.lang-toggle').find('a').on('click', function(e) {
      e.preventDefault();
      var lang;      
      var val = $(this).html();
      if (val === "en español") {
        lang = 'es';        
      } else if (val === "中文") {
        lang = 'zh';
      } else {
        lang = 'en';
      }      
      w.localStorage.setItem('lang', lang);
      langToggle(lang);
      return false;
    });
  }

  return {
    langToggle : langToggle,
    initLangButtons : initLangButtons
  };

})(window, document, jQuery);
var app = app || {};

app.pages = (function(w,d,$){          

  function iterateNodeList(list, fn) {
    if (list && list.length) {
      var i=0, len=list.length;
      for (i; i<len; i++) {
        return fn(list[i], i);
      }
    }
    if (list && !list.length) {
      return fn(list);
    }   
  } 
  
  function toggleClass(el, className) {
    iterateNodeList(el, function(el){
      if (el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >=0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
          el.className = classes.join(' ');
        }
      }
    });   
  }

  function toggleBurger(){
    // hamburger icon
    var burgerIcon = document.querySelector('.burger'),
        mainNavList = document.querySelector('.main-nav ul');          
    burgerIcon.addEventListener('click', function(e) {
      e.preventDefault();            
      toggleClass(burgerIcon, 'open');
      toggleClass(mainNavList, 'responsive');
    });              
  }   

	return {
    toggleBurger : toggleBurger,
	};
})(window, document, jQuery);