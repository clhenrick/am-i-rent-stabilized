$(window).on('load', function(){

  var $body = $('body'),
        $wrapper = $('#wrapper'),
        $section = $('section');
  
  $wrapper.width($(window).width());
  $section.width($(window).width());
  $section.height($(window).height());

  $(window).resize(function(){
    $wrapper.width($(window).width());
    $section.width($(window).width());
    $section.height($(window).height());
  });
  

});