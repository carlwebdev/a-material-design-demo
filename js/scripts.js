/*
 * Interaction enhancements for the Material UI demo
 */

$(function () {
  // Ripple effect for buttons
  $(document).on('click', '.md-button', function (event) {
    const $button = $(this);
    const offset = $button.offset();
    const diameter = Math.max($button.outerWidth(), $button.outerHeight());
    const x = event.pageX - offset.left - diameter / 2;
    const y = event.pageY - offset.top - diameter / 2;

    const $ripple = $('<span class="ripple" />').css({
      width: diameter,
      height: diameter,
      left: x,
      top: y
    });

    $button.find('.ripple').remove();
    $button.append($ripple);
  });

  // Toggle stateful filter chips
  $(document).on('click', '.md-chip', function () {
    const $chip = $(this);
    const isSelected = !$chip.hasClass('is-selected');
    $chip.toggleClass('is-selected', isSelected);
    $chip.attr('aria-pressed', isSelected.toString());
  });

  // Mobile navigation toggle
  $('.navicon').on('click', function () {
    const $nav = $('.primary-nav');
    const willOpen = !$nav.hasClass('is-open');
    $nav.toggleClass('is-open', willOpen);
    $(this)
      .attr('aria-expanded', willOpen.toString())
      .attr('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    $(this).find('.material-icons').text(willOpen ? 'close' : 'menu');
  });
});
