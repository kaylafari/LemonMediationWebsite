document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  const isHome = document.body.classList.contains('home');
  const hero = document.querySelector('.hero');

  if (isHome && header && hero) {
    // homepage: transparent -> solid on scroll
    const update = () => {
      if (window.scrollY > hero.offsetHeight * 0.7) {
        header.classList.add('solid'); header.classList.remove('transparent');
      } else {
        header.classList.add('transparent'); header.classList.remove('solid');
      }
    };
    window.addEventListener('scroll', update);
    update();
  } else if (header) {
    // inner pages: always solid
    header.classList.add('solid');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('show'));
  }
});
