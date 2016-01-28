$(document).ready(function(){

  // animation properties
  var inDeckPos = {left: '100vw', right: '-100vw'};
  var inViewPos = {left: 0, right: 0};
  var timeOut = 800;
  var timeIn = 800;
  var easeOut = 'swing';
  var easeIn = 'swing';

  // util functions
  function deactivateAll() {
    $('.active-section').removeClass('active-section');
  }

  // fired when slide changes. creates custom event 'newActive'
  function activateCard(card) {
    card.addClass('active-section').trigger('newActive');
  }

  // nav functions
  function goToCard(targetId) {
    var $activeSlide = $('.active-section');
    // block attempts to nav to current slide
    if($activeSlide.attr('id') !== targetId) {
      var $targetSlide = $('#' + targetId);
      // if nav to same type of slide, e.g. photo-section to photo-section:
      if (($activeSlide.hasClass('photo-section') && $targetSlide.hasClass('photo-section')) || ($activeSlide.hasClass('color-fill') && $targetSlide.hasClass('color-fill'))) {
        // successive animation
        $activeSlide.animate(inDeckPos, {
          start: deactivateAll,
          done: function() {
            activateCard($targetSlide);
            $targetSlide.animate(inViewPos, {
              duration: timeIn,
              easing: easeIn
            });
          },
          duration: timeOut,
          easing: easeOut
        });
      } else { // if nav to different type of slide
        // simulateous animation
        $activeSlide.animate(inDeckPos, {
          start: deactivateAll,
          duration: timeOut,
          easing: easeOut
        });
        $targetSlide.animate(inViewPos, {
          start: activateCard.bind(null, $targetSlide),
          duration: timeIn,
          easing: easeIn
        });
      }
    }
  }

  function nextSlide() {
    var activeSlideId = $('.active-section').attr('id');
    if (activeSlideId !== 'contact') { // can't go right of contact slide
      var nextSlideId = $('.active-section').next('.slide-section').attr('id');
      goToCard(nextSlideId);
    }
  }

  function prevSlide() {
    var activeSlideId = $('.active-section').attr('id');
    if (activeSlideId !== "home") { // can't go left of home slide
      var prevSlideId = $('.active-section').prev('.slide-section').attr('id');
      goToCard(prevSlideId);
    }
  }

  // event listeners
  // forward/back arrows
  $('a.next-slide').on('click', nextSlide);
  $('a.prev-slide').on('click', prevSlide);

  // nav links
  $('a.section-link').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-target');
    goToCard(id);
  });

  // nav link highlighting, uses custom event from activateCard fcn
  $('body').on('newActive', function() {
    $('i.nav-active').removeClass('nav-active');
    var activeId = $('.active-section').attr('id');
    $('.nav-icon[id="' + activeId + '-nav"] i').addClass('nav-active');
  });

  // mousewheel
  $('body').bind('mousewheel DOMMouseScroll', function(e){
    // if
    if ($('.slide-section:animated').length > 0) {
      e.preventDefault();
    } else {
      if(e.originalEvent.wheelDelta /120 > 0 || e.originalEvent.detail > 0) {
        prevSlide();
      }
      else{
        nextSlide();
      }
    }
  });

  // left/right keypresses
  $('body').on('keydown', function(e) {
    if ($('.slide-section:animated').length > 0) {
      e.preventDefault();
    } else {
      if (e.which === 37) {
        prevSlide();
      } else if (e.which === 39) {
        nextSlide();
      }
    }
  });

  $(function(){
    $(".live-type").typed({
      strings: ['FUTURISTIC', 'GAME CHANGING', 'POLISHED', 'DETERMINED', 'COACHABLE', 'INDUSTRIOUS'],
      typeSpeed: 175,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: false
    });
  });

});
