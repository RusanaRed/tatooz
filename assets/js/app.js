$(function() {

  let hero = $('#hero');
  let header = $('#header');
  let navigation = $('#navigation');

  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();
  let correctionBeforeNextSection = 110;


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

  /* Header + navigation classes on scroll 
  ================================================*/

  headerScroll()

  $(window).on('scroll resize', function() {
    headerScroll();
  });

  function headerScroll() {
    let heroH = hero.innerHeight();
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= (heroH - correctionBeforeNextSection)) {
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

  
  /* Gallery filters
  ================================================*/

  let filter = $("[data-filter]");
  let photo = $("[data-cat]");

  filter.on("click", function(event) {
    event.preventDefault();

    let category = $(this).data('filter');

    filter.each(function() {
      $(this).removeClass('filters-form__button--active');
    });
    $(this).addClass('filters-form__button--active');

    if (category == 'all') {
      photo.removeClass('hide');
    } else {
      photo.each(function() {
        let photoCategory = $(this).data('cat');
  
        if (photoCategory != category) {
          $(this).addClass('hide');
        } else {
          $(this).removeClass('hide');
        }
      });
    } 
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


  /* Yandex map
  ================================================*/

  const center = [59.9339198155389,30.35840941168666];
  const mark = [59.93409211022794,30.36044789053799];
  
  function init() {
    let map = new ymaps.Map('map', {
      center: center,
      zoom: 17,
    });

    let placemark = new ymaps.Placemark(mark, {}, {
      iconLayout: 'default#image',
      iconImageHref: 'assets/images/icons/placemark-icon.svg',
      iconImageSize: [50, 50],
      iconImageOffset: [-20, -20]
    });

    map.controls.remove('searchControl');
    map.controls.remove('geolocationControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.behaviors.disable(['scrollZoom']);

    map.geoObjects.add(placemark);
  }

  ymaps.ready(init);


  /* Modals
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
    }, 100);
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
    autoplaySpeed: 3500,
    speed: 900,
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
    disable: 'mobile',   
    offset: 80,     
    duration: 700, 
    once: true
  });


  

});
