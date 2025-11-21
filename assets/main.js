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

  // Mobile nav toggle
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
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
});
