$(document).ready(function(){
  //Include some logic based on viewport size.
  //MOBILE
  $('#main-menu').hide();
  $('.menu-div').hide();
  var posBool = false;

  // $('body').click(function(){
  //   if(posBool){
  //     $('.menu-div').slideUp();
  //   }
  // });  

  $('.mobile-button').click(function(){
    if(!posBool){
      $('.menu-div').fadeIn();
      posBool = true;
    } else {
      $('.menu-div').fadeOut();
      posBool = false;
    }
  });

  $('.mobile-button').mouseenter(function(){
    $('.mobile-button').css('background-color', 'rgba(100,100,100,1)');
  });

  $('.mobile-button').mouseleave(function(){
    $('.mobile-button').css('background-color', 'rgba(0,0,0,0)');
  });


});
