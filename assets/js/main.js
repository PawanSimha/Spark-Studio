/*
    assets/js/main.js
    Global utilities and base logic.
*/

// Dynamically includes HTML components based on data-include attribute
document.addEventListener("DOMContentLoaded", () => {
    // Developer: Pawan Simha
    // Dynamically includes HTML components based on data-include attribute
    document.querySelectorAll("[data-include]").forEach(el => {
        const filePath = el.getAttribute("data-include");
        // Use the path directly as it should be relative to the page
        const fullPath = filePath;

        fetch(fullPath)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`Failed to fetch component: ${fullPath}`);
                }
                return resp.text();
            })
            .then(html => {
                el.innerHTML = html;
                if (el.getAttribute("data-include").includes("header.html")) {
                    initializeHeaderLogic();
                }
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    });
});

// Function to handle header logic (mobile menu, theme toggle)
function initializeHeaderLogic() {
    // Active Link Highlighting
    const currentPath = window.location.pathname.toLowerCase();
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.toLowerCase().replace('..', '');
        link.classList.remove('active');

        // Home Page Detection
        const isHomePath = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/');
        const isHomeLink = href.includes('index.html') || href === '/' || href === './';

        if (isHomePath && isHomeLink) {
            link.classList.add('active');
        } else if (!isHomeLink && currentPath.indexOf(linkPath) !== -1) {
            link.classList.add('active');
        }
    });

    const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const html = document.documentElement;

    // Check for saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    html.setAttribute('data-theme', currentTheme);
    updateAllThemeIcons(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateAllThemeIcons(newTheme);
        });
    });

    function updateAllThemeIcons(theme) {
        document.querySelectorAll('#theme-icon, #mobile-theme-icon').forEach(icon => {
            icon.className = theme === 'light' ? 'fas fa-moon text-lg' : 'fas fa-sun text-lg';
        });

        const mobileThemeSpan = document.querySelector('#mobile-theme-toggle span');
        if (mobileThemeSpan) {
            mobileThemeSpan.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        }
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-lg';
        } else {
            icon.className = 'fas fa-times text-lg';
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            // Handle both internal (hash) and external links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-lg';
                }
            }
            // For external links, let the browser handle navigation normally
        });
    });

    // Header Scroll Effect
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// --- Initialize Lenis Smooth Scroll ---
(function() {
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js';
    lenisScript.onload = () => {
        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2
        });
    };
    document.head.appendChild(lenisScript);
})();

