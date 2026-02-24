// Video Play Functionality for index.html
const video = document.getElementById('showcase-video');
// Developer: Pawan Simha
const videoOverlay = document.getElementById('video-overlay');

if (video && videoOverlay) {
  videoOverlay.addEventListener('click', () => {
    video.play();
    videoOverlay.style.opacity = '0';
    videoOverlay.style.pointerEvents = 'none';
  });

  video.addEventListener('pause', () => {
    videoOverlay.style.opacity = '1';
    videoOverlay.style.pointerEvents = 'auto';
  });

  video.addEventListener('ended', () => {
    videoOverlay.style.opacity = '1';
    videoOverlay.style.pointerEvents = 'auto';
  });
}

// Form Submission for index.html
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}



// ================================================================================================================

// === Cities ===
const CITIES = [
  { name: 'Bangalore', note: 'Silicon Valley of India.', x: 34, y: 68.5 },
  { name: 'Mumbai', note: 'Financial capital.', x: 20.2, y: 55 },
  { name: 'Delhi', note: 'National Capital Region.', x: 34.32, y: 34 },
  { name: 'Hyderabad', note: 'Cyberabad tech hub.', x: 38, y: 59 },
  { name: 'Ahmedabad', note: 'Commercial capital of Gujarat.', x: 19.5, y: 46 },
  { name: 'Chennai', note: 'Gateway to South India.', x: 43.5, y: 69.5 },
  { name: 'Noida', note: 'Modern IT hub near Delhi.', x: 35.8, y: 35 },
  { name: 'Tirupati', note: 'Spiritual capital of Andhra.', x: 40, y: 67.2 },
  { name: 'Pune', note: 'Maharashtra IT hub.', x: 24, y: 57 },
  { name: 'Udaipur', note: 'City of Lakes, Rajasthan.', x: 24.2, y: 43 },
  // { name: 'Kolkata',     note: 'Cultural capital.',               x: 69.5, y: 48 },
  { name: 'Jaipur', note: 'Pink City of Rajasthan.', x: 30.2, y: 38 },
  { name: 'Gandhinagar', note: 'Green city of Gujarat.', x: 20, y: 45 }
];

const indiaMap = document.getElementById('indiaMap');
const stage = document.getElementById('stage');
const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
const chips = document.getElementById('chips');
const activeCity = document.getElementById('activeCity');
const activeNote = document.getElementById('activeNote');
const liveRegion = document.getElementById('liveRegion');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let idx = 0, running = true, intervalId = null;
let currentPos = { x: CITIES[0].x, y: CITIES[0].y };

// Locked to Light Theme - Removed theme handling logic


// ===== UI build for cities =====
function buildUI() {
  CITIES.forEach((c, i) => {
    const pin = document.createElement('button');
    pin.type = 'button'; pin.className = 'pin';
    pin.style.left = c.x + '%'; pin.style.top = c.y + '%';
    pin.setAttribute('aria-label', c.name);
    pin.addEventListener('click', () => setActive(i, true));
    stage.appendChild(pin);

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'px-3 py-1 rounded-full text-sm';
    chip.style.background = 'var(--chip-bg)';
    chip.style.color = 'var(--chip-text)';
    chip.addEventListener('mouseenter', () => chip.style.background = 'var(--chip-bg-hover)');
    chip.addEventListener('mouseleave', () => chip.style.background = 'var(--chip-bg)');
    chip.textContent = c.name;
    chip.addEventListener('click', () => setActive(i, true));
    chips.appendChild(chip);
  });
}

function easeInOutQuad(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

function animateTo(tx, ty, dur = 850) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { currentPos.x = tx; currentPos.y = ty; place(tx, ty); return; }
  const sx = currentPos.x, sy = currentPos.y, dx = tx - sx, dy = ty - sy;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const t = Math.min(1, (ts - start) / dur), e = easeInOutQuad(t);
    const nx = sx + dx * e, ny = sy + dy * e;
    place(nx, ny);
    if (t < 1) requestAnimationFrame(step); else { currentPos.x = tx; currentPos.y = ty; }
  }
  requestAnimationFrame(step);
}

function place(x, y) { dot.style.left = x + '%'; dot.style.top = y + '%'; ring.style.left = x + '%'; ring.style.top = y + '%'; }

function setActive(newIndex, user = false) {
  idx = (newIndex + CITIES.length) % CITIES.length;
  const c = CITIES[idx];
  activeCity.textContent = c.name;
  activeNote.textContent = c.note;
  liveRegion.textContent = `${c.name} — ${c.note}`;
  animateTo(c.x, c.y, 850);
  if (user) pauseAndResume();
}

function nextCity(user = false) { setActive(idx + 1, user); }
function prevCity(user = false) { setActive(idx - 1, user); }

function startAuto() { clearInterval(intervalId); running = true; intervalId = setInterval(() => nextCity(false), 2600); }
function pauseAuto() { running = false; clearInterval(intervalId); }
function pauseAndResume() { pauseAuto(); setTimeout(() => { if (!running) startAuto(); }, 4000); }

prevBtn.addEventListener('click', () => prevCity(true));
nextBtn.addEventListener('click', () => nextCity(true));

stage.addEventListener('mouseenter', pauseAuto);
stage.addEventListener('mouseleave', () => { if (!running) startAuto(); });
stage.addEventListener('focusin', pauseAuto);
stage.addEventListener('focusout', () => { if (!running) startAuto(); });
stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { nextCity(true); e.preventDefault(); } if (e.key === 'ArrowLeft') { prevCity(true); e.preventDefault(); } });

const ro = new ResizeObserver(() => { /* pins scale with % so nothing required */ });
ro.observe(indiaMap);

function init() { buildUI(); place(CITIES.x, CITIES.y); setActive(0, false); startAuto(); }
if (indiaMap.complete && indiaMap.naturalWidth) init(); else indiaMap.addEventListener('load', init, { once: true });

indiaMap.addEventListener('error', function () {
  this.style.background = '#e9e9e9ff'; this.style.minHeight = '520px';
  const msg = document.createElement('div'); msg.style.textAlign = 'center'; msg.style.color = '#26c13bff'; msg.style.padding = '12px';
  msg.innerHTML = '<p>India map placeholder</p><p style="font-size:12px">Place india-light.png and india-dark.png at /assets/images/Portfolio/</p>';
  this.insertAdjacentElement('afterend', msg);
});

// ================================================================================================================
// Enhanced FAQ functionality with smooth animations
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', function () {
      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          const otherTrigger = otherItem.querySelector('.faq-trigger');

          otherContent.style.maxHeight = '0px';
          otherIcon.style.transform = 'rotate(0deg)';
          otherItem.classList.remove('ring-2', 'ring-bright-orange/20');
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current FAQ item
      if (isOpen) {
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        item.classList.remove('ring-2', 'ring-bright-orange/20');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
        item.classList.add('ring-2', 'ring-bright-orange/20');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Add keyboard support
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });

    // Initialize ARIA attributes
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'faq-content-' + Array.from(faqItems).indexOf(item));
    content.setAttribute('id', 'faq-content-' + Array.from(faqItems).indexOf(item));
  });
});

// =======================================================

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  // Check if preloader has already been shown in this session
  if (sessionStorage.getItem("preloaderShown")) {
    preloader.style.display = "none";
    return;
  }

  // Delay before starting fade-out (3000ms = 3s, 5000ms = 5s)
  setTimeout(() => {
    preloader.classList.add("fade-out");

    // Remove preloader from DOM after fade transition (500ms)
    setTimeout(() => {
      preloader.style.display = "none";
      // Mark as shown for the current session
      sessionStorage.setItem("preloaderShown", "true");
    }, 500);
  }, 1500); // change to 5000 for 5 seconds
});

// ==============================================

