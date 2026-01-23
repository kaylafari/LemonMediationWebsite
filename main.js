document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  // Header behavior: transparent on home hero, solid elsewhere
  if (header) {
    if (hero && document.body.classList.contains('home')) {
      const updateHeader = () => {
        if (window.scrollY > hero.offsetHeight * 0.7) {
          header.classList.add('solid');
          header.classList.remove('transparent');
        } else {
          header.classList.add('transparent');
          header.classList.remove('solid');
        }
      };
      window.addEventListener('scroll', updateHeader);
      updateHeader();
      header.classList.add('transparent');
    } else {
      header.classList.add('solid');
    }
  }


  // ==============================
  // FULL-SCREEN MOBILE MENU
  // ==============================
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.classList.add('menu-open');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  }

  // Close menu when clicking links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Feature tile hover (safe even if none exist)
  const tiles = document.querySelectorAll('.feature-tile');

  tiles.forEach(tile => {
    tile.style.transition =
      'box-shadow 0.35s ease, transform 0.35s ease, filter 0.35s ease';

    tile.addEventListener('mouseenter', () => {
      tile.style.boxShadow = '0 22px 45px rgba(0,0,0,0.45)';
      tile.style.transform = 'translateY(-10px) scale(1.03)';
      tile.style.filter = 'brightness(1.08)';
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.boxShadow = 'none';
      tile.style.transform = 'translateY(0) scale(1)';
      tile.style.filter = 'brightness(1)';
    });
  });

  // ==============================
  // STATUE SIZING BASED ON ASPECT RATIO
  // ==============================
  // The statue can overlap text at certain aspect ratios (wide but short viewports).
  // This formula dynamically sizes the statue based on the viewport aspect ratio.
  // 
  // Key thresholds:
  // - MIN_WIDTH: Below this width (px), statue is hidden entirely
  // - MAX_ASPECT_RATIO: Above this ratio (width/height), statue starts shrinking
  // - IDEAL_ASPECT_RATIO: At or below this ratio, statue is at full size
  // 
  // The formula interpolates the statue height between these thresholds.

  const statue = document.querySelector('.statue-image');
  
  if (statue) {
    const MIN_WIDTH = 1200;           // Hide statue below this width
    const IDEAL_ASPECT_RATIO = 1.2;   // Full size at 4:3 or narrower (width/height)
    const MAX_ASPECT_RATIO = 2.5;     // Minimum size at ultra-wide (21:9 or wider)
    const BASE_HEIGHT_VH = 130;       // Full statue height in vh
    const MIN_HEIGHT_VH = 70;         // Minimum statue height in vh when shrinking

    function updateStatueSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const aspectRatio = vw / vh;

      // Hide statue below minimum width
      if (vw < MIN_WIDTH) {
        statue.style.display = 'none';
        return;
      }

      // Show statue
      statue.style.display = 'block';

      // Calculate height based on aspect ratio
      // - At IDEAL_ASPECT_RATIO or below: use BASE_HEIGHT_VH
      // - At MAX_ASPECT_RATIO or above: use MIN_HEIGHT_VH
      // - In between: linear interpolation
      let statueHeight;

      if (aspectRatio <= IDEAL_ASPECT_RATIO) {
        statueHeight = BASE_HEIGHT_VH;
      } else if (aspectRatio >= MAX_ASPECT_RATIO) {
        statueHeight = MIN_HEIGHT_VH;
      } else {
        // Linear interpolation between ideal and max aspect ratios
        const t = (aspectRatio - IDEAL_ASPECT_RATIO) / (MAX_ASPECT_RATIO - IDEAL_ASPECT_RATIO);
        statueHeight = BASE_HEIGHT_VH - (t * (BASE_HEIGHT_VH - MIN_HEIGHT_VH));
      }

      statue.style.height = `${statueHeight}vh`;
    }

    // Run on load and resize
    updateStatueSize();
    window.addEventListener('resize', updateStatueSize);
  }
});
