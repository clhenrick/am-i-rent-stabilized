var app = app || {};

app.init = (function(w,d){
  
  function init(){
    var el = app.el;
    var f = app.ui.f;
    var state = app.s;

    state.currentSlide = el.slides[0];
    f.goToSlide(el.currentSlide);
    f.createMailTo();
    f.addToCalendar();
    app.map.init();
  }
  
  return {
    init : init
  };

})(window, document);