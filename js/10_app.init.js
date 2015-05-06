var app = app || {};

app.init = (function(w,d){
  
  function init(){
    app.el = app.el.refDOM();
    app.a = app.address;
    var state = app.s;    
    app.fns = app.helpers.registerfns();


    app.events.publish('state-change', {
      currentSlide : app.el.slides[0]
    });

    app.fns.onResize();
    app.fns.goToSlide(el.currentSlide);
    app.a.createMailTo();
    app.fns.addToCalendar();
    app.map.init();
  }
  
  return {
    init : init
  };

})(window, document);