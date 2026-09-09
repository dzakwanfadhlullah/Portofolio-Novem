/* Portfolio navigation and interactions */
((jQuery) => {
  "use strict";

  const $ = jQuery;
  const transitionDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;

  function closeMobileNav() {
    if (!$('body').hasClass('mobile-nav-active')) return;
    $('body').removeClass('mobile-nav-active');
    $('.mobile-nav-toggle')
      .attr('aria-expanded', 'false')
      .attr('aria-label', 'Buka menu navigasi')
      .find('i')
      .removeClass('icofont-close')
      .addClass('icofont-navigation-menu');
    $('.mobile-nav-overly').fadeOut(transitionDelay);
  }

  function showSection(hash) {
    const $target = $(hash);
    if (!$target.length) return false;

    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
    $('.nav-menu, .mobile-nav').find(`a[href="${hash}"]`).parent('li').addClass('active');

    if (hash === '#header') {
      $('#header').removeClass('header-top');
      $('section').removeClass('section-show').attr('aria-hidden', 'true');
      closeMobileNav();
      return true;
    }

    const revealTarget = () => {
      $('section').removeClass('section-show').attr('aria-hidden', 'true');
      $target.addClass('section-show').attr('aria-hidden', 'false');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    if (!$('#header').hasClass('header-top')) {
      $('#header').addClass('header-top');
      window.setTimeout(revealTarget, transitionDelay);
    } else {
      revealTarget();
    }

    closeMobileNav();
    return true;
  }

  $(document).on('click', '.nav-menu a, .mobile-nav a', function(event) {
    const samePage = location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname;
    if (!samePage || !this.hash || !showSection(this.hash)) return;
    event.preventDefault();
    history.replaceState(null, '', this.hash === '#header' ? location.pathname : this.hash);
  });

  if ($('.nav-menu').length) {
    const $mobileNav = $('.nav-menu').clone().prop({ class: 'mobile-nav d-lg-none' });
    $('body').append($mobileNav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none" aria-label="Buka menu navigasi" aria-expanded="false"><i class="icofont-navigation-menu" aria-hidden="true"></i></button>');
    $('body').append('<div class="mobile-nav-overly" aria-hidden="true"></div>');

    $(document).on('click', '.mobile-nav-toggle', function() {
      const isOpen = !$('body').hasClass('mobile-nav-active');
      $('body').toggleClass('mobile-nav-active', isOpen);
      $(this)
        .attr('aria-expanded', String(isOpen))
        .attr('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi')
        .find('i')
        .toggleClass('icofont-navigation-menu', !isOpen)
        .toggleClass('icofont-close', isOpen);
      $('.mobile-nav-overly').stop(true, true).fadeToggle(transitionDelay);
    });

    $(document).on('click', '.mobile-nav-overly', closeMobileNav);
    $(document).on('keydown', (event) => {
      if (event.key === 'Escape') closeMobileNav();
    });
  }

  if (window.location.hash && $(window.location.hash).length) {
    showSection(window.location.hash);
  } else {
    $('section').attr('aria-hidden', 'true');
  }

  if (typeof window.Typed === 'function') {
    new window.Typed('.typing', {
      strings: ['Mahasiswa Teknik Informatika', 'Web Developer', 'Problem Solver'],
      loop: true,
      typeSpeed: 55,
      backSpeed: 38,
      backDelay: 1400
    });
  }

  if ($.fn.venobox) {
    $('.venobox').venobox({ closeBackground: '#09203a' });
  }
})(jQuery);
