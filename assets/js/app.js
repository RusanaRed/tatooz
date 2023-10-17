$(function() {
  
  let hero = $('#hero');
  let header = $('#header');
  let navigation = $('#navigation');

  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();

  /* Header + navigation classes on scroll 
  ================================================*/

  headerScroll()

  $(window).on('scroll resize', function() {
    headerScroll();
  });

  function headerScroll() {
    let heroH = hero.innerHeight();
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= heroH) {
      header.addClass('header--dark');
      navigation.addClass('navigation--no-border');
    } else {
      header.removeClass('header--dark');
      navigation.removeClass('navigation--no-border');
    }
  };

  /* Smooth scroll to sections
  ================================================*/

  $('[data-scroll]').on('click', function(event) {
    event.preventDefault();

    let scrollElement = $(this).data('scroll');
    let scrollElementPosition = $(scrollElement).offset().top;

    $('html, body').animate({
      scrollTop: scrollElementPosition - headerH
    }, 500)
  });


  /* ScrollSpy
  ================================================*/

  let windowH = $(window).height();
  scrollSpy(scrollTop);

  $(window).on('scroll', function() {
    scrollTop = $(this).scrollTop();
    
    scrollSpy(scrollTop);
  });

  function scrollSpy (scrollTop) {
    $('[data-scrollspy]').each(function() {
      
      let $this = $(this);
      let sectionId = $this.data('scrollspy');
      let sectionOffset = $this.offset().top;
      sectionOffset = sectionOffset - (windowH / 3);

      if (scrollTop >= sectionOffset) {
        $('#navigation [data-scroll]').removeClass('active');
        $('#navigation [data-scroll="' + sectionId + '"]').addClass('active');
      }

      if (scrollTop == 0) {
        $('#navigation [data-scroll]').removeClass('active');
      }
    });
  };


  /* Selected file name for input-file
  ================================================*/

  $('.input-file input[type=file]').on('change', function(){
    let file = this.files[0];
    $(this).closest('.input-file').find('.input-file__text').html(file.name);
  });


  /* Modal
  ================================================*/

  $('[data-modal]').on('click', function(event) {
    event.preventDefault();

    let modal = $(this).data('modal');

    $('body').addClass('no-scroll');
    $(modal).addClass('show');

    setTimeout(function() {
      $(modal).find('.modal__frame').css({
        transform: 'translateY(0)',
        opacity: '1'
      });
    }, 200);
  });

  $('[data-modal-close]').on('click', function(event) {
    event.preventDefault();
    let modal = $(this).parents('.modal');
    modalClose(modal)
  });

  $('.modal').on('click', function() {
    let modal = $(this);
    modalClose(modal)
  });

  $('.modal__frame').on('click', function(event) {
    event.stopPropagation();
  })

  function modalClose(modal) {
    modal.find('.modal__frame').css({
      transform: 'translateY(-100px)',
      opacity: '0'
    });

    setTimeout(function() {
      $('body').removeClass('no-scroll');
      modal.removeClass('show');
    }, 200);
  }


  /* Slick slider https://kenwheeler.github.io/slick/
  ================================================*/

  /* Hero Slider */

  $('#heroSlider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500
  });

  /* Reviews Slider */

  let reviewsSlider = $('#reviewsSlider');

  reviewsSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500
  });



});
