const toggleBtn = document.getElementById('mode-toggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = html.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', toggleTheme);

// On load, set theme from localStorage or system preference
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

// Twinkling stars generation
function createStars(num = 80) {
  const starsContainer = document.querySelector('.stars');
  if (!starsContainer) return;
  starsContainer.innerHTML = ""; // Clear previous stars if any
  for (let i = 0; i < num; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 1.2 + 0.6;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.position = 'absolute';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    // Subtle color variation
    const color = Math.random() > 0.8 ? '#e0eaff' : '#fff';
    star.style.background = color;
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random() * 0.5 + 0.3;
    star.style.filter = 'blur(0.5px)';
    starsContainer.appendChild(star);
  }
}

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(document.querySelectorAll('main section'));

function onScroll() {
  let scrollPos = window.scrollY || window.pageYOffset;
  let offset = 80; // header height
  let current = sections[0].id;
  for (const section of sections) {
    if (section.offsetTop - offset <= scrollPos) {
      current = section.id;
    }
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll);
document.addEventListener('DOMContentLoaded', onScroll);

document.addEventListener('DOMContentLoaded', function() {
  createStars();
}); 
