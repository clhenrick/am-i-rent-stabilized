var app = app || {};

app.init = (function (w, d) {
  // gets the whole thing going
  // called after langToggle loads JSON data for content
  function init() {
    app.el = app.elems.refDOM();
    app.a = app.address.address();
    app.f = app.helpers.registerfns();
    app.l.listen();
    app.language.initLangButtons();

    app.events.publish("state-change", {
      currentSlide: app.el.slides[0],
    });

    app.f.onResize();
    app.f.goToSlide(app.el.currentSlide);
    app.a.createMailTo();
    app.f.addToCalendar();
    app.map.init();
  }

  return {
    init: init,
  };
})(window, document);
