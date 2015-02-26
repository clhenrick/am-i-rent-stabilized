var app = app || {};

app.ui = (function(w,d,$, parseAddress){
	//First the variables our app is going to use need to be declared

	//References to DOM elements
	var $window = $(window),
		$document = $(document),	
	 	$navButtons = $("nav a").filter("[href^=#]"), //Only links that starts with #
	 	$navGoPrev = $(".go-prev"),
	 	$navGoNext = $(".go-next"),
	 	$navGoFirst = $(".go-first"),
	 	$slidesContainer = $(".slides-container"),
	 	$slides = $(".slide"),
	 	$currentSlide = $slides.first(),
	 	$addressInput = $(".address-input"),
	 	$selectBoro = $('.select-borough'),
	 	$search = $('.search'),
	 	$yes = $('.yes'),
	 	$no = $('.no'),
	 	$spinner = $('.spinner'),
	 	$spinnerColor = '#000',
	 	$map = $('#map'),
	 	$mapMessage = $('.map-message');

	//Animating flag - is our app animating
	var isAnimating = false;

	//The height of the window
	var pageHeight = $window.innerHeight();

	//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
	var keyCodes = {
		UP  : 38,
		DOWN: 40
	}

	/*
	*   Adding event listeners
	* */

	$window.on("resize", onResize).resize();
	$window.on("mousewheel DOMMouseScroll", onMouseWheel);
	$document.on("keydown", onKeyDown);
	$navButtons.on("click", onNavButtonClick);
	$navGoPrev.on("click", goToPrevSlide);
	$navGoNext.on("click", goToNextSlide);
	$navGoFirst.on("click", goToFirstSlide);	

	/*
	*   Internal functions
	* */


	/*
	*   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
	* */
	function onNavButtonClick(event)
	{
		//The clicked button
		var $button = $(this);

		//The slide the button points to
		var $slide = $($button.attr("href"));

		//If the slide exists, we go to it
		if($slide.length)
		{
			goToSlide($slide);
			event.preventDefault();
		}
	}

	/*
	*   Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
	*   This way, if there's text input, the user is still able to fill it
	* */
	function onKeyDown(event)
	{

		var PRESSED_KEY = event.keyCode;

		if(PRESSED_KEY == keyCodes.UP)
		{
			goToPrevSlide();
			event.preventDefault();
		}
		else if(PRESSED_KEY == keyCodes.DOWN)
		{
			goToNextSlide();
			event.preventDefault();
		}

	}

	/*
	*   When user scrolls with the mouse, we have to change slides
	* */
	function onMouseWheel(event)
	{
		//Normalize event wheel delta
		var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

		//If the user scrolled up, it goes to previous slide, otherwise - to next slide
		if(delta < -1)
		{
			goToNextSlide();
		}
		else if(delta > 1)
		{
			goToPrevSlide();
		}

		event.preventDefault();
	}

	/*
	*   If there's a previous slide, slide to it
	* */
	function goToPrevSlide()
	{
		if($currentSlide.prev().length)
		{
			goToSlide($currentSlide.prev());
		}
	}

	/*
	*   If there's a next slide, slide to it
	* */
	function goToNextSlide()
	{
		if ($currentSlide.next().length)
		{
			goToSlide($currentSlide.next());	
		}		
	}

	function goToFirstSlide()
	{
		if($currentSlide.length)
		{
			$addressInput.val('');
			$selectBoro.val('select');
			toggleMessage();
			goToSlide($slides.first());
		}
	}

	/*
	*   Actual transition between slides
	* */
	function goToSlide($slide)
	{
		//If the slides are not changing and there's such a slide
		if(!isAnimating && $slide.length)
		{
			//setting animating flag to true
			isAnimating = true;
			$currentSlide = $slide;

			//Sliding to current slide
			TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});

			//Animating menu items
			TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});

			TweenLite.to($navButtons.filter("[href=#" + $currentSlide.attr("id") + "]"), 0.5, {className: "+=active"});

		}
	}

	/*
	*   Once the sliding is finished, we need to restore "isAnimating" flag.
	*   You can also do other things in this function, such as changing page title
	* */
	function onSlideChangeEnd()
	{
		isAnimating = false;
	}

	/*
	*   When user resize it's browser we need to know the new height, so we can properly align the current slide
	* */
	function onResize(event)
	{

		//This will give us the new height of the window
		var newPageHeight = $window.innerHeight();

		/*
		*   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
		* */
		if(pageHeight !== newPageHeight)
		{
			pageHeight = newPageHeight;

			//This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
			TweenLite.set([$slidesContainer, $slides], {height: pageHeight + "px"});

			//The current slide should be always on the top
			TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
		}

	}

	// toggle which message is shown to user
	function toggleMessage(){
		$yes.toggleClass('hidden');
		$no.toggleClass('hidden');
	}

	// creates the mail to for requesting rent history
  	function createMailTo(address) {
    		var email = "rentinfo@nyshcr.org",
          		subject = "request for rent history",
          		body = "Hello, \n\n" +
		                    "I, <YOUR NAME HERE>, am currently renting " + 
		                    "<YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE>" +
		                    " and would like the rent history for the apartment I am renting." +
		                    " Any information you can provide me would be greatly appreciated. \n\n" +
		                    "thank you,\n\n" +
		                    "- <YOUR NAME HERE>",
          		msg = 'mailto:' + encodeURIComponent(email) +
	                     '?subject=' + encodeURIComponent(subject) +
	                     '&body=' + encodeURIComponent(body); 
		$('#mailto').attr('href',msg);
  	}

	function checkAddress(address, borough) {
	      var parsedStreetAddress = parseAddress.parseLocation(address),
	      	streetNum = parsedStreetAddress.number;	  	
		// check the parsed street address 
		if (parsedStreetAddress.type && !parsedStreetAddress.prefix) { 

		  streetAddress = parsedStreetAddress.street + ' ' + parsedStreetAddress.type;

		} else if (parsedStreetAddress.type && parsedStreetAddress.prefix) {
		  
		  streetAddress = parsedStreetAddress.prefix + ' ' +
		                            parsedStreetAddress.street + ' ' + 
		                            parsedStreetAddress.type;         

		} else if (parsedStreetAddress.prefix && !parsedStreetAddress.type) {
		  
		  streetAddress = parsedStreetAddress.prefix + ' ' +
		                            parsedStreetAddress.street;
		  
		} else {
		  streetAddress = parsedStreetAddress.street;
		};

		app.map.geoclient(streetNum, streetAddress, borough);    
	}	  	

	// when user clicks the search button fire the app!
	$search.on('click', function(){
	  var  streetAddress = $addressInput.val(),
	        boro = $selectBoro.val();        
	  // check to make sure user filled out form correctly
	  if (streetAddress !== "" && boro !== "select") {
		goToNextSlide();
		checkAddress(streetAddress, boro);			  	
	  } else if (boro === "select") {
	  	alert('Please select a borough.');
	  } else if (streetAddress === "") {
	  	alert('Please enter your house number and street.');
	  } else {
	  	alert('Please re-enter your address and borough.');
	  };	                
	});   		

    // spinner presets
    $.fn.spin.presets.huge = {
        lines: 13, // The number of lines to draw
        length: 100, // The length of each line
        width: 40, // The line thickness
        radius: 100, // The radius of the inner circle
        corners: 0.5, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: $spinnerColor, // #rgb or #rrggbb or array of colors
        speed: 0.7, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'huge', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
      }

      $.fn.spin.presets.large = {
        lines: 11, 
        length: 70, 
        width: 30, 
        radius: 70, 
        corners: 0.5, 
        rotate: 0, 
        direction: 1, 
        color: $spinnerColor, 
        speed: 0.7, 
        trail: 60, 
        shadow: false, 
        hwaccel: false, 
        className: 'large', 
        zIndex: 2e9
        // top: '50%', 
        // left: '50%' 
      } 

      $.fn.spin.presets.med = {
        lines: 11, 
        length: 40, 
        width: 20, 
        radius: 50, 
        corners: 0.5, 
        rotate: 0, 
        direction: 1, 
        color: $spinnerColor, 
        speed: 0.7, 
        trail: 60, 
        shadow: false, 
        hwaccel: false, 
        className: 'large', 
        zIndex: 2e9, 
        top: '50%', 
        left: '50%' 
      }   

	$spinner.spin('large', $spinnerColor);

	if ($(window).width() <= 960 || $(window).height() <=770) {
	  $spinner.spin('large', $spinnerColor);
	}

	if ($(window).width() <=600) {
	  $spinner.spin('med', $spinnerColor);
	} 

	function init(){
		goToSlide($currentSlide);
		$yes.addClass('hidden');
		// $map.addClass('hidden');
		// $mapMessage.addClass('hidden');
	}

	return {
		init : init,
		toggleMessage: toggleMessage,
		goToSlide : goToSlide
	};

})(window, document, jQuery, parseAddress);

window.addEventListener('DOMContentLoaded', function(){
	app.ui.init();
	app.map.initMap();
});
