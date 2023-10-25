$(function() {

  /* Navigation Toggle on mobile
  ================================================*/

  let navigationToggle = $('#navigationToggle');
  let userNavigation = $('#userNavigation');

  navigationToggle.on('click', function(event) {
    event.preventDefault();

    $('body').toggleClass('nav-show');
    $(this).toggleClass('active');
    userNavigation.toggleClass('show');

  });

  $(window).on('resize', function() {
    $('body').removeClass('nav-show');
    navigationToggle.removeClass('active');
    userNavigation.removeClass('show');
  });


  
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

    $('body').removeClass('nav-show');
    navigationToggle.removeClass('active');
    userNavigation.removeClass('show');

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
    speed: 700,
  });

  /* Reviews Slider */

  $('#reviewsSlider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500
  });

  /* Aos.js https://github.com/michalsnik/aos
  ================================================*/

  AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 80, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });

});
