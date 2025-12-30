/**
 * Unisis Group - GSAP Animations
 * Scroll-triggered animations and effects
 */

// Wait for GSAP to load
document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded. Animations disabled.');
    // Show elements without animation
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize animations after preloader
  setTimeout(() => {
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    init3DCardEffects();
    initParallaxEffects();
  }, 1500);
});

/**
 * Hero Section Animations - Cinematic Reveal
 */
function initHeroAnimations() {
  const heroTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // Set initial states
  gsap.set('.hero__founder', { opacity: 0, scale: 1.1 });
  gsap.set('.hero__gradient', { opacity: 0 });
  gsap.set('.hero__flare', { opacity: 0, scale: 0.8 });
  gsap.set('.hero__label', { opacity: 0, y: 20 });
  gsap.set('.hero__title-line', { opacity: 0, y: 40 });
  gsap.set('.hero__subtitle', { opacity: 0, y: 30 });
  gsap.set('.hero__cta', { opacity: 0, y: 30 });
  gsap.set('.hero__stats', { opacity: 0, y: 40 });

  heroTimeline
    // Cinematic reveal - founder image fades in FIRST with scale
    .to('.hero__founder', {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out'
    })
    // Gradient overlay fades in
    .to('.hero__gradient', {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=1.5')
    // Gold flare appears
    .to('.hero__flare', {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=1')
    // Label fades in
    .to('.hero__label', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.8')
    // Title lines animate one by one
    .to('.hero__title-line', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    }, '-=0.4')
    // Subtitle follows
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.5')
    // CTA buttons
    .to('.hero__cta', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.4')
    // Stats ribbon slides up
    .to('.hero__stats', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.5')
    // Scroll indicator fades in
    .to('.hero__scroll', {
      opacity: 1,
      duration: 0.6
    }, '-=0.4');

  // Parallax effect on particles
  gsap.to('.particle--1', {
    y: -100,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  gsap.to('.particle--2', {
    y: -150,
    x: 50,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  gsap.to('.particle--3', {
    y: -80,
    x: -30,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  });

  gsap.to('.particle--4', {
    y: -120,
    x: 40,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.8
    }
  });

  gsap.to('.particle--5', {
    y: -60,
    x: -60,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2.2
    }
  });

  // Founder image parallax - moves slower (cinematic depth)
  gsap.to('.hero__founder img', {
    y: 80,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  // Gold flare parallax
  gsap.to('.hero__flare', {
    y: 50,
    x: -30,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });
}

/**
 * Scroll-triggered Section Animations
 */
function initScrollAnimations() {
  // General reveal animations
  gsap.utils.toArray('.reveal').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Reveal from left
  gsap.utils.toArray('.reveal-left').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0,
        x: -60
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Reveal from right
  gsap.utils.toArray('.reveal-right').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0,
        x: 60
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Scale reveal
  gsap.utils.toArray('.reveal-scale').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Staggered animations for grids
  animateStaggeredGrid('.companies__grid', '.company-card');
  animateStaggeredGrid('.industries__grid', '.industry-item');
  animateStaggeredGrid('.presence__locations', '.presence__location');
  animateStaggeredGrid('.stats__grid', '.stat-item');
  animateStaggeredGrid('.offices-grid', '.office-card');
  animateStaggeredGrid('.gallery__grid', '.gallery__item');
  animateStaggeredGrid('.achievements__grid', '.achievement');
  animateStaggeredGrid('.regional__countries', '.country-card');

  // Regional section animations
  initRegionalAnimations();

  // Roadmap animations
  initRoadmapAnimations();
}

/**
 * Roadmap Journey Animations
 */
function initRoadmapAnimations() {
  const milestones = document.querySelectorAll('.roadmap__milestone');

  if (!milestones.length) return;

  milestones.forEach((milestone, index) => {
    const isLeft = milestone.classList.contains('roadmap__milestone--left');
    const isCenter = milestone.classList.contains('roadmap__milestone--center');
    const startX = isCenter ? 0 : (isLeft ? -80 : 80);
    const startY = isCenter ? 50 : 30;

    const marker = milestone.querySelector('.roadmap__marker');
    const card = milestone.querySelector('.roadmap__card');

    // Animate marker
    if (marker) {
      gsap.fromTo(marker,
        {
          opacity: 0,
          scale: 0.5,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: milestone,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate card
    if (card) {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: startX,
          y: startY
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: milestone,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // Animate SVG path drawing
  const roadmapPath = document.querySelector('.roadmap__line');
  if (roadmapPath) {
    const pathLength = roadmapPath.getTotalLength ? roadmapPath.getTotalLength() : 2000;

    gsap.set(roadmapPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    gsap.to(roadmapPath, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.roadmap',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });
  }
}

/**
 * Staggered Grid Animation
 */
function animateStaggeredGrid(containerSelector, itemSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll(itemSelector);

  gsap.fromTo(items,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => animateCounter(counter, target),
      once: true
    });
  });
}

function animateCounter(element, target) {
  const duration = 2;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = (currentTime - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease out quad)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

/**
 * 3D Card Tilt Effects
 */
function init3DCardEffects() {
  const cards = document.querySelectorAll('.company-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
  // Section backgrounds parallax
  gsap.utils.toArray('.section--dark').forEach(section => {
    gsap.to(section, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Floating elements in About section
  const aboutImage = document.querySelector('.about__image');
  if (aboutImage) {
    gsap.to(aboutImage, {
      y: -30,
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // Chairman section parallax
  const chairmanImage = document.querySelector('.chairman__image');
  if (chairmanImage) {
    gsap.to(chairmanImage, {
      y: -40,
      scrollTrigger: {
        trigger: '.chairman',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}

/**
 * Text Split Animation (for headlines)
 */
function initTextSplitAnimations() {
  const headlines = document.querySelectorAll('.split-text');

  headlines.forEach(headline => {
    // Split text into spans
    const text = headline.textContent;
    headline.innerHTML = text.split('').map(char =>
      char === ' ' ? ' ' : `<span class="char">${char}</span>`
    ).join('');

    const chars = headline.querySelectorAll('.char');

    gsap.fromTo(chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: headline,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn--primary');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

/**
 * Regional Section Animations
 */
function initRegionalAnimations() {
  const regionalSection = document.querySelector('.regional');
  if (!regionalSection) return;

  // Animate regional stats with stagger
  const regionalStats = document.querySelectorAll('.regional-stat');
  gsap.fromTo(regionalStats,
    {
      opacity: 0,
      y: 40,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.regional__stats',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Country card hover effects with GSAP
  const countryCards = document.querySelectorAll('.country-card');
  countryCards.forEach(card => {
    const flag = card.querySelector('.country-card__flag');

    card.addEventListener('mouseenter', () => {
      if (flag) {
        gsap.to(flag, {
          scale: 1.2,
          rotate: 5,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (flag) {
        gsap.to(flag, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });

  // Animate stat bars on scroll
  const statBars = document.querySelectorAll('.regional-stat__bar');
  statBars.forEach(bar => {
    gsap.fromTo(bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Initialize magnetic buttons after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initMagneticButtons, 2000);
});
