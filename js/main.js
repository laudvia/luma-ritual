const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });
revealElements.forEach((el) => observer.observe(el));

const cards = document.querySelectorAll('.tilt-card');
cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = -((y / rect.height) - 0.5) * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

const ritualData = {
  morning: {
    eyebrow: 'Morning Focus',
    title: 'Open the day with clear energy.',
    text: 'Starter ritual for work, study, and getting into flow.',
    number: '01',
    gradient: 'radial-gradient(circle at 20% 20%,#fff 0 7%,transparent 20%),linear-gradient(125deg,#dfff67,#ff79a8 45%,#7d5cff)'
  },
  midday: {
    eyebrow: 'Midday Calm',
    title: 'Reset stress without losing momentum.',
    text: 'A gentle daytime ritual for calm concentration and social ease.',
    number: '02',
    gradient: 'radial-gradient(circle at 76% 24%,#fff 0 7%,transparent 19%),linear-gradient(125deg,#8fffd6,#ffe473 42%,#ff8c3a)'
  },
  night: {
    eyebrow: 'Night Reset',
    title: 'Close the loop and drift into rest.',
    text: 'An evening blend for relaxation, sleep, and recovery.',
    number: '03',
    gradient: 'radial-gradient(circle at 28% 30%,#fff 0 7%,transparent 20%),linear-gradient(125deg,#15110d,#7d5cff 48%,#ff79a8)'
  }
};

const chips = document.querySelectorAll('.time-chip');
const panel = document.querySelector('#ritualPanel');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');
    const data = ritualData[chip.dataset.state];
    panel.style.background = data.gradient;
    panel.innerHTML = `
      <div>
        <p class="eyebrow">${data.eyebrow}</p>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
      </div>
      <span>${data.number}</span>
    `;
  });
});

const canvas = document.querySelector('#orb-canvas');
const ctx = canvas.getContext('2d');
let width;
let height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth * window.devicePixelRatio;
  height = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  particles = Array.from({ length: Math.min(70, Math.floor(window.innerWidth / 18)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: (Math.random() * 3 + 1) * window.devicePixelRatio,
    vx: (Math.random() - 0.5) * 0.35 * window.devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.35 * window.devicePixelRatio,
    alpha: Math.random() * 0.5 + 0.15
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(21, 17, 13, ${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
window.addEventListener('resize', resizeCanvas);
