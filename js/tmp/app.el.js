var app = app || {};

app.el = (function(w,d,$) {
  // references to DOM elements
  var el =  {
      navGoNext : d.querySelectorAll('.go-next'),
      navGoFirst : d.querySelectorAll('.go-first'),
      navGoFour : d.querySelectorAll('.go-step4'),
      burgerIcon : d.querySelector('.burger'),
      navBar : d.querySelector('.main-nav'),
      mainNavList : d.querySelector('.main-nav ul'),
      progressCircles : d.querySelectorAll('.margin-circles li'),
      slidesContainer : d.querySelector('.slides-container'),
      slides : d.querySelectorAll('.slide'),
      slide4 : d.querySelector('#slide-8'),
      dd : null,
      addressInput : d.querySelector('.address-input'),
      boroSelect : d.querySelector('.user-data.borough-select'),
      boroDropDown : d.getElementById('boroughs'),
      boroDropDownItems : d.querySelectorAll('#boroughs li a'),
      selectBoro : d.getElementsByName('borough'),
      search : d.querySelector('.search'),
      valErrors : d.querySelectorAll('.validation-error'),
      valErrorAddress : d.getElementById('error-address'),
      valErrorBoro : d.getElementById('error-boro'),
      valErrorNF : d.getElementById('error-not-found'),
      yes : d.querySelectorAll('.yes'),
      no : d.querySelectorAll('.no'),
      yesNoState : false,
      map : d.getElementById('map'),
      mapMessage : d.querySelector('.map-message'),
      mailTo : d.getElementById('mail-to'),
      lightBox : d.getElementById('rent-history'),
      addToCalendar : d.getElementById('atc_text_link'),
      addToCalendarLink : d.querySelector('#atc_text_link_link.atcb-link'),
      fbShare : d.querySelector('.fb-share-button'),    
      learnMore : d.querySelector('.button.learn-more')
  };

  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li');
    this.val = undefined;    
    this.index = -1;
    this.initEvents();
  }  

  // dropdown
  DropDown.prototype = {
    initEvents : function() {
      var obj = this;

      // console.log('initEvents this: ', this);

      obj.dd.on('click', function(e){
        e.preventDefault();
        // $(this).toggleClass('active');
        toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.val);        
        // console.log('obj: ', obj);  
      });
    },

    getValue : function() {
      return this.val;
    },

    getIndex : function() {
      return this.index;
    }
  };

  el.dd = new DropDown( $('.user-data.borough-select') );  

  return {
    el : el
  };

})(window, document, jQuery);