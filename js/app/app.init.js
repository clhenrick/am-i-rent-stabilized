var app = app || {};

app.init = (function(w,d){
  
  function init(){
    var template = app.templates.main;

    $.getJSON('../data/content.json', function(data){
      html = template(data.languages[0].en);
      document.querySelector('#wrapper').innerHTML = html;
    })
      .done(function(){
        app.el = app.el.refDOM();
        app.a = app.a.address();
        app.f = app.helpers.registerfns();
        app.l.listen();

        app.events.publish('state-change', {
          currentSlide : app.el.slides[0]
        });

        app.f.onResize();
        app.f.goToSlide(app.el.currentSlide);
        app.a.createMailTo();
        app.f.addToCalendar();
        app.map.init();
    });
  }
  
  return {
    init : init
  };

})(window, document);