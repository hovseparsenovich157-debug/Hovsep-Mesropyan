// Theme toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Carousel auto slide
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = (i) => {
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
};
const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
};
const prevSlide = () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
};
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
setInterval(nextSlide, 2000);
showSlide(slideIndex);

// Countdown
const countdown = document.getElementById('countdown');
const targetDate = new Date('2026-04-24T00:00:00').getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) {
    countdown.innerText = 'Событие прошло';
    return;
  }
  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((distance % (1000*60*60))/(1000*60));
  const secs = Math.floor((distance % (1000*60))/1000);
  countdown.innerText = days + 'д ' + hours + 'ч ' + mins + 'м ' + secs + 'с';
}, 1000);
