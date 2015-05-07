var app = app || {};

app.language = (function(w,d,$) {

    var $es,
          $zh,
          $en;

  function loadTemplateData(lang, callback){
    var template = app.templates.main,
          html;
    
    $.getJSON('../data/main-content.json', function(data) {      
      if (lang === 'es') {
        html = template(data.languages.es);
      } else if (lang === 'zh') {
        html = template(data.languages.zh);
      } else  {
        html = template(data.languages.en);
      }      
      d.querySelector('#wrapper').innerHTML = html;
    })
    .done(function(){
      if (callback && typeof callback === "function") { 
        callback();
      }      
      app.init.init();
      $es = $('#lang-toggle .toggle-es');
      $zh = $('#lang-toggle .toggle-zh');
      $en = $('#lang-toggle .toggle-en');
      changeLangButtons(lang);
      addthis.layers.refresh();
    });
  }
  
  function langToggle(lang) {
      var curLang;

      if (typeof lang === 'undefined') {
        curLang = d.URL.substring(d.URL.lastIndexOf('=') + 1, d.URL.length);
      } else {
        curLang = lang;
      }

      loadTemplateData(curLang);
  }

  function changeLangButtons(lang) {
    console.log('changeLangButtons: ', lang);
    if (lang === "es") {  
      $es.html('in english');
      $es.removeClass('toggle-es').addClass('toggle-en');
      $zh.html('中文');
      $('body').addClass('es');
    } else if (lang === "zh") {
      $es.html('en español');
      $zh.html('in english');
      $zh.removeClass('toggle-zh').addClass('toggle-en');
      $('body').addClass('zh');
    } else {
      $es.html('en español');
      $zh.html('中文');
      $('body').addClass('en');
    }
  }

  function initLangButtons() {
    $('#lang-toggle').find('a').on('click', function(e) {
      e.preventDefault();
      var val = $(this).html();
      if (val === "en español") {
        langToggle('es');
      } else if (val === "中文") {
        langToggle('zh');
      } else {
        langToggle('en');
      }
    });
  }

  return {
    langToggle : langToggle,
    initLangButtons : initLangButtons
  };

})(window, document, jQuery);