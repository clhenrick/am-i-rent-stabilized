var app = app || {};

app.pages = (function(w,d,$){
	function init() {
    function toggleBurger(){
      // hamburger icon
      var burgerIcon = document.querySelector('.burger'),
          mainNavList = document.querySelector('.main-nav ul');          
      burgerIcon.addEventListener('click', function(e) {
        e.preventDefault();            
        toggleClass(burgerIcon, 'open');
        toggleClass(mainNavList, 'responsive');
      });              
    }           

    function iterateNodeList(list, fn) {
      if (list && list.length) {
        var i=0, len=list.length;
        for (i; i<len; i++) {
          return fn(list[i], i);
        }
      }
      if (list && !list.length) {
        return fn(list);
      }   
    } 
    
    function toggleClass(el, className) {
      iterateNodeList(el, function(el){
        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);
          if (existingIndex >=0) {
            classes.splice(existingIndex, 1);
          } else {
            classes.push(className);
            el.className = classes.join(' ');
          }
        }
      });   
    }

    app.language.langToggle('en', toggleBurger);  		
	}

	return {
		init : init
	}
})(window, document, jQuery);