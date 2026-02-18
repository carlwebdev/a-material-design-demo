/*
 * Interaction enhancements for the Material UI demo
 */

$(function () {
  const positionHeaderSearchPopover = function () {
    const popover = document.getElementById('header-search');
    const toggle = document.querySelector('.header-search-toggle');
    if (!popover || !toggle) {
      return;
    }

    const rect = toggle.getBoundingClientRect();
    const top = Math.round(rect.bottom + 12);
    const right = Math.max(14, Math.round(window.innerWidth - rect.right));

    popover.style.setProperty('--search-popover-top', top + 'px');
    popover.style.setProperty('--search-popover-right', right + 'px');
  };

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

  $('.primary-nav a').on('click', function () {
    const $nav = $('.primary-nav');
    if ($nav.hasClass('is-open')) {
      $nav.removeClass('is-open');
      const $toggle = $('.navicon');
      $toggle
        .attr('aria-expanded', 'false')
        .attr('aria-label', 'Open navigation')
        .find('.material-icons')
        .text('menu');
    }
  });

  // Header search popover toggle
  $('.header-search-toggle').on('click', function () {
    const popover = document.getElementById('header-search');
    if (!popover || typeof popover.showPopover !== 'function') {
      return;
    }

    const isOpen = popover.matches(':popover-open');
    if (isOpen) {
      popover.hidePopover();
      $(this).attr('aria-expanded', 'false');
      return;
    }

    positionHeaderSearchPopover();
    popover.showPopover();
    $(this).attr('aria-expanded', 'true');
    setTimeout(function () {
      $('#header-search-input').trigger('focus');
    }, 0);
  });

  document.addEventListener('toggle', function (event) {
    if (event.target && event.target.id === 'header-search') {
      const isOpen = event.newState === 'open';
      $('.header-search-toggle').attr('aria-expanded', isOpen.toString());
    }
  });

  $(window).on('resize scroll', function () {
    const popover = document.getElementById('header-search');
    if (popover && popover.matches(':popover-open')) {
      positionHeaderSearchPopover();
    }
  });
});
