/**
 * Unisis Group - Main JavaScript
 * A Journey of Excellence
 * Core functionality: Navigation, Preloader, Custom Cursor, Forms, Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initPreloader();
  initNavigation();
  initCustomCursor();
  initSmoothScroll();
  initContactForm();
  initBackToTop();
  initLightbox();
});

/**
 * Preloader
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloaderProgress');
  let progress = 0;

  // Simulate loading progress
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Hide preloader after a short delay
      setTimeout(() => {
        preloader.classList.add('hidden');

        // Remove preloader from DOM after animation
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 300);
    }
    progressBar.style.width = `${progress}%`;
  }, 100);
}

/**
 * Navigation
 */
function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  // Scroll effect for navigation
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active link based on scroll position
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  });
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');

  // Check if device supports hover (not touch)
  if (window.matchMedia('(hover: none)').matches) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursor on first move
    cursor.classList.add('visible');
    cursorDot.classList.add('visible');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    cursorDot.classList.remove('visible');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
    cursorDot.classList.add('visible');
  });

  // Smooth cursor animation
  function animateCursor() {
    // Smooth follow for main cursor
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Faster follow for dot
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .company-card, .office-card, .presence__location');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Add loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success (in production, handle actual response)
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = '#10B981';

    // Reset form
    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 2000);
  });

  // Add ripple effect to submit button
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');

  if (!backToTop) return;

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  });
}

/**
 * Gallery Lightbox
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox__image');
  const lightboxCaption = lightbox?.querySelector('.lightbox__caption');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  const lightboxPrev = lightbox?.querySelector('.lightbox__nav--prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__nav--next');
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;
  const images = [];

  // Collect all gallery images
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery__caption');
    if (img) {
      images.push({
        src: img.src,
        alt: img.alt,
        caption: caption?.textContent || ''
      });

      // Click to open lightbox
      item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(images[currentIndex]);
      });

      // Make items focusable and keyboard accessible
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          currentIndex = index;
          openLightbox(images[currentIndex]);
        }
      });
    }
  });

  function openLightbox(image) {
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate in
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lightboxImg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 50);
  }

  function closeLightbox() {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.style.transition = '';
    }, 300);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'translateX(20px)';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxCaption.textContent = images[currentIndex].caption;
      lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'translateX(0)';
    }, 150);
  }

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Navigation buttons
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
  }

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  }
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait = 10) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
