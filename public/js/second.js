$(window).on('load', function(){

  var $body = $('body'),
        $wrapper = $('#wrapper'),
        $section = $('section');
  
  // set slide dimensions to user window
  $wrapper.width($(window).width());
  $section.width($(window).width());
  $section.height($(window).height());

  $(window).resize(function(){
    $wrapper.width($(window).width());
    $section.width($(window).width());
    $section.height($(window).height());
  });

  // smooth scroll transition via CSS Tricks blog:
  // http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  // loading GIF
  $.fn.spin.presets.huge = {
      lines: 13, // The number of lines to draw
      length: 100, // The length of each line
      width: 40, // The line thickness
      radius: 100, // The radius of the inner circle
      corners: 0.5, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#fff', // #rgb or #rrggbb or array of colors
      speed: 0.7, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'huge', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    }

  $('#gif').spin('huge','#fff');

});