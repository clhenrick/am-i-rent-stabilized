var app = app || {};

app.init = (function(w,d){
  
  function init(){
    var el = app.el.el;
    var f = app.f;
    var a = app.a;
    var state = app.s;

    app.events.publish('state-change', {
      pageHeight : w.innerHeight,
      currentSlide : el.slides[0]
    });

    f.goToSlide(el.currentSlide);
    a.createMailTo();
    f.addToCalendar();
    app.map.init();
  }
  
  return {
    init : init
  };

})(window, document);