/* ============================================================
   Trivikra Tech – main.js
   Modular Vanilla JavaScript for interactions & animations
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
   * 1. NAVBAR – Scroll-based transparency / glass toggle & Logo color
   * ------------------------------------------------------ */
  const navbar = document.getElementById('mainNavbar');
  const hasDarkHero = document.body.classList.contains('has-dark-hero');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('logo-primary');
      navbar.classList.remove('logo-white');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-transparent');
      if (hasDarkHero) {
        navbar.classList.add('logo-white');
        navbar.classList.remove('logo-primary');
      } else {
        navbar.classList.add('logo-primary');
        navbar.classList.remove('logo-white');
      }
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  /* Run once on load */
  handleNavbarScroll();

  /* Close mobile menu on link click */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* --------------------------------------------------------
   * 2. SMOOTH SCROLL – For anchor links
   * ------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
   * 3. SCROLL REVEAL – Intersection Observer
   * ------------------------------------------------------ */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show everything if no IO support */
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* --------------------------------------------------------
   * 4. BACK TO TOP BUTTON
   * ------------------------------------------------------ */
  var backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------
   * 5. CONTACT FORM – Frontend validation
   * ------------------------------------------------------ */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (contactForm.checkValidity()) {
        /* Show success message */
        var formWrapper = contactForm.closest('.contact-form-wrapper');
        if (formWrapper) {
          var successMsg = formWrapper.querySelector('.form-success');
          if (successMsg) {
            contactForm.style.display = 'none';
            successMsg.style.display = 'block';
          }
        }
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        contactForm.classList.add('was-validated');
      }
    });
  }

  /* --------------------------------------------------------
   * 6. ACTIVE NAV LINK HIGHLIGHT
   * ------------------------------------------------------ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    /* Also mark active for course detail pages */
    if (
      (currentPage === 'ui-ux-design.html' ||
        currentPage === 'web-development.html' ||
        currentPage === 'graphic-design.html') &&
      href === 'courses.html'
    ) {
      link.classList.add('active');
    }
    /* Blog detail */
    if (currentPage === 'blog-detail.html' && href === 'blog.html') {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------
   * 7. HERO ENTRANCE ANIMATIONS
   * ------------------------------------------------------ */
  var heroElements = document.querySelectorAll('.hero-animate');
  heroElements.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease ' + (index * 0.15) + 's, transform 0.7s ease ' + (index * 0.15) + 's';

    /* Trigger after a tiny delay to allow page paint */
    setTimeout(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });

  /* --------------------------------------------------------
   * 8. COUNTER ANIMATION (About page stats)
   * ------------------------------------------------------ */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      /* Ease-out cubic */
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(ease * target);
      el.textContent = current + (el.dataset.suffix || '');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + (el.dataset.suffix || '');
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.counter');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  /* --------------------------------------------------------
   * 9. HERO CAROUSEL – Automatic cycling initialization & CTA sync
   * ------------------------------------------------------ */
  const heroCarouselEl = document.getElementById('heroCarousel');
  const heroCtaBtn = document.getElementById('heroDynamicCta');

  if (heroCarouselEl && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
    new bootstrap.Carousel(heroCarouselEl, {
      interval: 4500,
      ride: 'carousel',
      pause: false,
      wrap: true
    });

    if (heroCtaBtn) {
      heroCarouselEl.addEventListener('slide.bs.carousel', function (e) {
        const nextItem = e.relatedTarget;
        if (nextItem && nextItem.dataset.courseUrl) {
          heroCtaBtn.setAttribute('href', nextItem.dataset.courseUrl);
        }
      });
    }
  }

  /* --------------------------------------------------------
   * 11. YEAR IN FOOTER
   * ------------------------------------------------------ */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------
   * 12. CERTIFICATE ANTI-DOWNLOAD & ANTI-SCREENSHOT PROTECTION
   * ------------------------------------------------------ */
  const certFrames = document.querySelectorAll('.cert-image-frame');
  const certSection = document.getElementById('certification');

  if (certFrames.length > 0) {
    // 1. Create floating security notification toast
    const toast = document.createElement('div');
    toast.className = 'cert-security-toast';
    toast.innerHTML = '<i class="fa-solid fa-shield-halved text-warning"></i><span>Official Preview Protected • Downloading & Screenshots Restricted</span>';
    document.body.appendChild(toast);

    let toastTimer;
    function showSecurityToast(customMsg) {
      if (customMsg) {
        toast.innerHTML = '<i class="fa-solid fa-shield-halved text-warning"></i><span>' + customMsg + '</span>';
      }
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('show');
      }, 2400);
    }

    function triggerPrivacyBlur(duration) {
      certFrames.forEach(function (frame) {
        frame.classList.add('cert-privacy-blur');
      });
      showSecurityToast('Preview Protected • Copying & Screenshots are Disabled');
      setTimeout(function () {
        certFrames.forEach(function (frame) {
          frame.classList.remove('cert-privacy-blur');
        });
      }, duration || 2000);
    }

    // 2. Prevent right-click, context menu, and dragging
    certFrames.forEach(function (frame) {
      frame.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        triggerPrivacyBlur(1200);
        return false;
      });

      frame.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
      });
    });

    // 3. Intercept screenshot shortcuts, PrintScreen, Print (Ctrl+P), Save (Ctrl+S)
    window.addEventListener('keydown', function (e) {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try { navigator.clipboard.writeText(''); } catch (err) {}
        }
        triggerPrivacyBlur(2500);
      }

      // Mac Screenshot: Cmd + Shift + 3, 4, 5
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5' || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53)) {
        triggerPrivacyBlur(3000);
      }

      // Save or Print shortcut (Ctrl/Cmd + S or Ctrl/Cmd + P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
        if (certSection) {
          const rect = certSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            e.preventDefault();
            triggerPrivacyBlur(2000);
          }
        }
      }
    });

    // 4. Blur when window loses focus (e.g. Snipping tool or screen capture utility activated)
    window.addEventListener('blur', function () {
      if (certSection) {
        const rect = certSection.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          certFrames.forEach(function (frame) {
            frame.classList.add('cert-privacy-blur');
          });
        }
      }
    });

    window.addEventListener('focus', function () {
      setTimeout(function () {
        certFrames.forEach(function (frame) {
          frame.classList.remove('cert-privacy-blur');
        });
      }, 300);
    });

    // 5. Visibility change (tab switch / screen capture modal)
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        certFrames.forEach(function (frame) {
          frame.classList.add('cert-privacy-blur');
        });
      } else {
        setTimeout(function () {
          certFrames.forEach(function (frame) {
            frame.classList.remove('cert-privacy-blur');
          });
        }, 300);
      }
    });
  }

  /* --------------------------------------------------------
   * 13. MEGA DROPDOWN (COURSES) – Mobile Toggle
   * ------------------------------------------------------ */
  const megaDropdowns = document.querySelectorAll('.dropdown-mega');
  megaDropdowns.forEach(function (mega) {
    const toggle = mega.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          mega.classList.toggle('show');
        }
      });
    }
  });

})();

