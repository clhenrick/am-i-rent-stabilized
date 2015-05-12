var app = app || {};

app.language = (function(w,d,$) {

    var $es,
        $zh,
        $en,
        langs = ['en','es','zh'];

  function loadTemplateData(lang, currentPage, callback){
    var template,
        html,
        filePath,
        contentFolder = 'data/';

    if (langs.indexOf(lang) === -1) { lang = 'en'; }
    // w.location.hash = '?lang=' + lang;    
    console.log('load template lang: ', lang);
    // load the correct JSON file based on the app's page...
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
      if (callback && typeof callback === "function") { 
        callback();
      }      
      if (currentPage === 'index') {
        app.init.init();
      } else {
        app.pages.toggleBurger();
      }  
      $es = $('.lang-toggle .toggle-es');
      $zh = $('.lang-toggle .toggle-zh');
      $en = $('.lang-toggle .toggle-en');
      changeLangButtons(lang);      
    });
  }
  
  function langToggle(lang, callback) {
      var curLang;
      var currentPage = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.lastIndexOf('.'));
      
      if (['index', 'why', 'how', 'resources'].indexOf(currentPage) === -1) {
        currentPage = 'index';
      }

      if (typeof lang === 'undefined') {
        curLang = d.URL.substring(d.URL.lastIndexOf('=') + 1, d.URL.length);
        // curLang = w.location.href.substring(w.location.href.lastIndexOf('=') + 1, w.location.href.length);
        console.log('curLang: ', curLang.path);
      } else {
        curLang = lang;
      }

      console.log('curLang: ', curLang);

      loadTemplateData(curLang, currentPage, callback);
  }

  function changeLangButtons(lang) {
    // console.log('changeLangButtons: ', lang);
    if (lang === "es") {  
      $es.html('in english');
      $es.removeClass('toggle-es').addClass('toggle-en');
      $zh.html('中文');
      $('body').addClass('es');
      $('body').removeClass('en');
      $('body').removeClass('zh');
      toggleNavButtonHref('es', 'en');
    } else if (lang === "zh") {
      $es.html('en español');
      $zh.html('in english');
      $zh.removeClass('toggle-zh').addClass('toggle-en');
      $('body').addClass('zh');
      $('body').removeClass('es');
      $('body').removeClass('en');
      toggleNavButtonHref('zh','en');
    } else {
      $es.html('en español');
      $zh.html('中文');
      $('body').addClass('en');
      $('body').removeClass('es');
      $('body').removeClass('zh');
      toggleNavButtonHref('en', 'es');
      toggleNavButtonHref('en', 'zh');
    }
  }

  function initLangButtons() {
    $('.lang-toggle').find('a').on('click', function(e) {
      e.preventDefault();      
      var val = $(this).html();
      if (val === "en español") {
        langToggle('es');
      } else if (val === "中文") {
        langToggle('zh');
      } else {
        langToggle('en');
      }
      return false;            
    });
  }

  function toggleNavButtonHref(newLang, oldLang) {
    // var $navButtons = $('.nav');
    $.each($('.nav a'), function(index, value){
      if ($(value).attr('href').indexOf('lang') === -1){
        $(value).attr('href', $(value).attr('href') + '?lang=' + newLang);  
      } else {
        $(value).attr('href', $(value).attr('href').replace('lang=' + oldLang, 'lang=' + newLang));
      }      
    });
  }

  return {
    langToggle : langToggle,
    initLangButtons : initLangButtons
  };

})(window, document, jQuery);