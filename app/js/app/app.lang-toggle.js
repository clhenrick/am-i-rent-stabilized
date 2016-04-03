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