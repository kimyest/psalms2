// 모바일 내비 토글
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
  // 메뉴 항목 클릭 시 닫기
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// 테마(다크/라이트) 토글
const root = document.documentElement;
const modeBtn = document.querySelector('.mode');
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    const current = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = current;
    localStorage.setItem('theme', current);
    modeBtn.setAttribute('aria-pressed', String(current === 'dark'));
  });
}

// 푸터 연도 자동 표기
document.getElementById('year').textContent = new Date().getFullYear();

// 포트폴리오 필터(칩)
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  cards.forEach(c => {
    c.style.display = (f === 'all' || c.classList.contains(f)) ? '' : 'none';
  });
}));

// 맨 위로 버튼
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 라이트박스 (이미지 확대 & 좌우 탐색)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const btnClose = document.querySelector('.lightbox-close');
const btnPrev = document.querySelector('.lightbox-prev');
const btnNext = document.querySelector('.lightbox-next');

let gallery = [];
let current = 0;

function openLightbox(idx) {
  lightbox.classList.add('open');
  current = idx;
  lightboxImg.src = gallery[current].dataset.full || gallery[current].src;
  lightboxImg.alt = gallery[current].alt || '';
}
function closeLightbox() {
  lightbox.classList.remove('open');
}
function show(offset) {
  current = (current + offset + gallery.length) % gallery.length;
  lightboxImg.src = gallery[current].dataset.full || gallery[current].src;
  lightboxImg.alt = gallery[current].alt || '';
}

// 모든 카드 이미지 등록
const images = document.querySelectorAll('.card img');
gallery = Array.from(images);
images.forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(i));
});

// 라이트박스 컨트롤
btnClose.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', () => show(-1));
btnNext.addEventListener('click', () => show(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') show(-1);
  if (e.key === 'ArrowRight') show(1);
});
