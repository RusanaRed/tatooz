$(function() {
  
  let hero = $("#hero");
  let header = $("#header");
  let navigation = $("#navigation");


  /* Header + navigation classes on scroll 
  ================================================*/

  headerScroll()

  $(window).on("scroll resize", function() {
    headerScroll();
  });

  function headerScroll() {
    let heroH = hero.innerHeight();
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= heroH) {
      header.addClass("header--dark");
      navigation.addClass("navigation--no-border");
    } else {
      header.removeClass("header--dark");
      navigation.removeClass("navigation--no-border");
    }
  };

  

});
