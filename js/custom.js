(function ($) {

  "use strict";

  // COLOR MODE
  $('.color-mode').click(function () {
    $('.color-mode-icon').toggleClass('active')
    $('body').toggleClass('dark-mode')
  })


  // HEADER
  $(".navbar").headroom();

  // PROJECT CAROUSEL
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true
  });

  // SMOOTHSCROLL
  $(function () {
    $('.nav-link, .custom-btn-link').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  });

  // TOOLTIP
  $('.social-links a').tooltip();

})(jQuery);

var accordion = (function () {

  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');

  // default settings 
  var settings = {
    // animation speed
    speed: 400,

    // close all other accordion items if true
    oneOpen: false
  };

  return {
    // pass configurable object literal
    init: function ($settings) {
      $accordion_header.on('click', function () {
        accordion.toggle($(this));

        setTimeout(() => {
          $('body, html').animate({
            scrollTop: $(this).offset().top
          }, 500)
        }, 400)
      });

      $.extend(settings, $settings);

      // ensure only one accordion is active if oneOpen is true
      if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }

      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function ($this) {

      if (settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
          .find('> .js-accordion-item')
          .removeClass('active')
          .find('.js-accordion-body')
          .slideUp()
      }

      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

$(document).ready(function () {
  accordion.init({ speed: 300, oneOpen: true });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    $('.color-mode-icon').addClass('active')
    $('body').addClass('dark-mode')
  } else {
    $('.color-mode-icon').removeClass('active')
    $('body').removeClass('dark-mode')
  }
});



// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//scroll to Q&A and open download options
var QaALink = document.getElementById("download-options");
QaALink.onclick = function (event) {
  span.click();
  var QaAButton = document.querySelector('#navbarNav > ul.navbar-nav.mx-auto > li:nth-child(5) > a');
  setTimeout(function () { QaAButton.click(); }, 200);
  var QaAelement = document.querySelector('#troubleshooting > div > div:nth-child(3) > div.accordion-header.js-accordion-header');
  setTimeout(function () { QaAelement.click(); }, 1100);

}

//direct download
var downloadFile = document.getElementById('download-file');
downloadFile.onclick = function (event) {
  downloadURL('./images/mineonmobile.apk');
}

var $idown;  // Keep it outside of the function, so it's initialized once.
var downloadURL = function (url) {
  if ($idown) {
    $idown.attr('src', url);
  } else {
    $idown = $('<iframe>', { id: 'idown', src: url }).hide().appendTo('body');
  }
}

var directDownload = document.getElementById('direct-download');
directDownload.onclick = function (event) {
  downloadURL('./images/mineonmobile.apk');
}