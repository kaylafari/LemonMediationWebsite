
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.site-header');
 const hero=document.querySelector('.hero');
 const toggle=document.querySelector('.nav-toggle');
 const nav=document.querySelector('.main-nav');
 if(hero){ // home page behavior
   function updateHeader(){if(window.scrollY>hero.offsetHeight*0.7){header.classList.add('solid');header.classList.remove('transparent')}else{header.classList.add('transparent');header.classList.remove('solid')}};
   window.addEventListener('scroll',updateHeader);updateHeader();
   header.classList.add('transparent');
 } else { // inner pages solid
   header.classList.add('solid');
 }
 if(toggle&&nav)toggle.addEventListener('click',()=>nav.classList.toggle('show'));
});
