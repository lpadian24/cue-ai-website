/* ═══════════════════════════════════════
   CUE AI — Main JavaScript
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar scroll effect ───
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Mobile nav toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll animations (Intersection Observer) ───
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // ─── Hero particles ───
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Contact form handling ───
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Show success state
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 10l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Thank you! We'll be in touch.
      `;
      btn.style.background = '#00C2A8';
      btn.style.boxShadow = '0 4px 15px rgba(0,194,168,0.3)';
      btn.disabled = true;

      // Reset after 4 seconds
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    });
  }

  // ─── Parallax on hero rings ───
  const heroVisual = document.querySelector('.hero-device-mockup');
  if (heroVisual && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      const rings = heroVisual.querySelectorAll('.mockup-ring');
      rings.forEach((ring, i) => {
        const factor = (i + 1) * 0.5;
        ring.style.transform = `translate(calc(-50% + ${x * factor}px), calc(-50% + ${y * factor}px))`;
      });
    });
  }

});
