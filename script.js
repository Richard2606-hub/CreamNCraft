// Ensure spinner hides once everything loads (with min delay + hero fade-in)
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  const heroText = document.querySelector('.hero-text');
  const minDisplayTime = 300;
  const startTime = performance.now();

  const hideSpinner = () => {
    if (spinner) {
      spinner.style.display = 'none';
      spinner.setAttribute('aria-hidden', 'true');
    }
    if (heroText) {
      heroText.classList.add('visible');
    }
  };

  const elapsed = performance.now() - startTime;
  if (elapsed < minDisplayTime) {
    setTimeout(hideSpinner, minDisplayTime - elapsed);
  } else {
    hideSpinner();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // (your existing JS below, untouched)

  const authBtn = document.getElementById('auth-btn');
  const userIcon = document.getElementById('user-icon');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backToTopBtn = document.getElementById('back-to-top');
  const shopNowBtn = document.getElementById('shop-now-btn');

  // --- Authentication (mock, persisted) ---
  const persisted = localStorage.getItem('isLoggedIn') === 'true';
  const setAuthState = (state) => {
    if (authBtn && userIcon) {
      if (state) {
        authBtn.classList.add('hidden');
        authBtn.setAttribute('aria-pressed', 'true');
        userIcon.classList.remove('hidden');
      } else {
        authBtn.classList.remove('hidden');
        authBtn.setAttribute('aria-pressed', 'false');
        userIcon.classList.add('hidden');
      }
    }
    localStorage.setItem('isLoggedIn', state ? 'true' : 'false');
  };
  setAuthState(persisted);

  if (authBtn) {
    authBtn.addEventListener('click', () => setAuthState(true));
  }
  if (userIcon) {
    userIcon.addEventListener('click', () => setAuthState(false));
  }

  // --- Hamburger toggle for mobile ---
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
    });
  }

  // --- Dropdown toggle on small screens ---
  if (productsToggle && dropdownContent) {
    productsToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const expanded = productsToggle.getAttribute('aria-expanded') === 'true';
        productsToggle.setAttribute('aria-expanded', String(!expanded));
        dropdownContent.classList.toggle('show');
      }
    });
  }

  // --- Smooth scroll for anchor links (internal) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        if (navLinks && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // --- Shop Now (safety redirect) ---
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'Ice-cream.html';
    });
  }

  // --- Back to top visibility & click ---
  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) backToTopBtn.classList.add('show');
    else backToTopBtn.classList.remove('show');
  };
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Accessibility: close open menus with Escape ---
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      if (navLinks && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
      if (dropdownContent && dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        if (productsToggle) productsToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // --- On resize: cleanup ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      if (navLinks && navLinks.classList.contains('show')) navLinks.classList.remove('show');
      if (dropdownContent && dropdownContent.classList.contains('show')) dropdownContent.classList.remove('show');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      if (productsToggle) productsToggle.setAttribute('aria-expanded', 'false');
    }
  });
});


// Example: show cart badge dynamically
const cartCount = document.getElementById('cart-count');
// Suppose we track items in localStorage as 'cartItems' array
let items = JSON.parse(localStorage.getItem('cartItems') || "[]");
if (items.length > 0) {
  cartCount.textContent = items.length;
  cartCount.style.display = 'inline-block';
}

window.addEventListener('load', () => {
  const brandText = document.querySelector('.brand-context-text');
  if (brandText) {
    brandText.classList.add('visible');
  }
});

const video = document.getElementById("heroVideo");
  const button = document.getElementById("soundToggle");

  button.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      button.textContent = "🔇 Mute";
    } else {
      video.muted = true;
      button.textContent = "🔊 Unmute";
    }
  });
