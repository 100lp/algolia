$(document).foundation();

// sandwitch button
$('.js-panda').on( "click", function() {
  $('.js-hiding').toggleClass( 'is-showed' );
});

// advice-menu accordion
$('.js-accordion').on( "click", function() {
  $(this).toggleClass( 'is-closed' );
  $('.js-hiding').toggleClass( 'is-showed' );
});

// advice-banner height detection
var adviceHeight = $('.js-advice-inner').height();
$(function () {
  if (adviceHeight > 50) {
    $('.js-advice-text').addClass('is-bigger');
  }
});


;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document)
  //Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs($(".tabs")) : null;
    // $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    // $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    // $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    // $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).


})(jQuery, this);
