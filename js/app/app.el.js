var app = app || {};

app.elems = (function(w,d,$) { 
  var el;
  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li > a');
    this.val = undefined;    
    this.name = undefined;
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
        app.f.toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.data("boro");
        obj.name = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.name);        
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

  // references to DOM elements
  function refDOM(){
    el =  {
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
      dd : new DropDown( $('.user-data.borough-select')),
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
      addToCalendarLink : d.querySelector('.atcb-link'),
      noTR : d.querySelector('.no-local-tr'),
      yesTR : d.querySelector('.yes-local-tr'),
      trModal : d.getElementsByClassName('tr-modal')[0],           
      learnMore : d.querySelector('.button.learn-more')
    };

    return el;
  }
  
   // trModalClose : d.querySelector('.org-container .close'),      

  return {
    refDOM : refDOM
  };

})(window, document, jQuery);