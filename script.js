// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu on nav click
        const mm = document.getElementById('mobile-menu');
        if (mm) mm.classList.add('hidden');
    });
});

// Výpočet let zkušeností
function calculateYearsOfExperience() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    const el = document.getElementById('years-of-experience');
    if (el) el.textContent = years;
}

// ── Mobile menu toggle ──────────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.innerHTML = isHidden
            ? '<i class="fas fa-bars text-lg"></i>'
            : '<i class="fas fa-times text-lg"></i>';
    });
}

// ── Sticky nav glass effect ─────────────────────────────────────────────────
const siteHeader = document.getElementById('site-header');

function updateNav() {
    if (!siteHeader) return;
    const scrolled = window.scrollY > 60;
    siteHeader.classList.toggle('scrolled', scrolled);

    siteHeader.querySelectorAll('.nav-link').forEach(link => {
        if (scrolled) {
            link.classList.remove('text-white/80', 'hover:text-white');
            link.classList.add('text-slate-600', 'hover:text-slate-900');
        } else {
            link.classList.add('text-white/80', 'hover:text-white');
            link.classList.remove('text-slate-600', 'hover:text-slate-900');
        }
    });

    const logo = siteHeader.querySelector('.nav-logo');
    if (logo) {
        logo.classList.toggle('text-white', !scrolled);
        logo.classList.toggle('text-slate-900', scrolled);
        const dot = logo.querySelector('span');
        if (dot) {
            dot.classList.toggle('text-blue-400', !scrolled);
            dot.classList.toggle('text-blue-700', scrolled);
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.classList.toggle('text-white', !scrolled);
        mobileMenuBtn.classList.toggle('text-slate-700', scrolled);
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Scroll reveal via IntersectionObserver ──────────────────────────────────
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length || !('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}
initReveal();

// ── Modal ───────────────────────────────────────────────────────────────────
const modal        = document.getElementById('imageModal');
const modalContent = modal ? modal.querySelector('.flex > div') : null;
const modalImage   = document.getElementById('modalImage');

if (modalContent) {
    modalContent.addEventListener('click', e => e.stopPropagation());
}
if (modalImage) {
    modalImage.addEventListener('click', e => e.stopPropagation());
}

function openModal(imageSrc, title, description) {
    if (!modal) return;
    const modalTitle       = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    if (modalImage)       { modalImage.src = imageSrc; modalImage.alt = title; }
    if (modalTitle)       modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

if (modal) {
    modal.addEventListener('click', e => {
        if (!modalContent || !modalContent.contains(e.target)) closeModal();
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ── Carousel (guarded – elements may not be present) ───────────────────────
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const dots          = document.querySelectorAll('.carousel-dot');
const prevButton    = document.querySelector('.carousel-prev');
const nextButton    = document.querySelector('.carousel-next');

if (carouselTrack && carouselItems.length > 0) {
    let currentIndex = 0;
    const itemWidth  = carouselItems[0].offsetWidth;

    function loadImage(imgElement) {
        if (!imgElement) return;
        const src = imgElement.getAttribute('data-src');
        if (!src) return;
        const spinner = imgElement.parentElement
            ? imgElement.parentElement.querySelector('.loading-spinner')
            : null;
        imgElement.onload = () => {
            imgElement.classList.remove('hidden');
            if (spinner) spinner.style.display = 'none';
        };
        imgElement.src = src;
    }

    function loadCurrentAndAdjacentImages() {
        const prevIdx = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        const nextIdx = (currentIndex + 1) % carouselItems.length;
        loadImage(carouselItems[currentIndex].querySelector('img'));
        loadImage(carouselItems[prevIdx].querySelector('img'));
        loadImage(carouselItems[nextIdx].querySelector('img'));
    }

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-blue-600', i === currentIndex);
            dot.classList.toggle('bg-gray-300',  i !== currentIndex);
        });
        loadCurrentAndAdjacentImages();
    }

    if (prevButton) prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });
    if (nextButton) nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    });
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
    }));

    loadCurrentAndAdjacentImages();
}

// ── Form submit handling ────────────────────────────────────────────────────
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        this.submit();
        const formContainer = this.parentElement;
        if (formContainer) {
            formContainer.innerHTML = `
                <div class="bg-green-50 border border-green-200 text-green-800 px-6 py-10 rounded-2xl text-center" role="alert">
                    <div class="text-4xl mb-4"><i class="fas fa-circle-check text-green-600"></i></div>
                    <strong class="text-xl font-semibold block mb-2">Zpráva odeslána</strong>
                    <span class="text-green-700 text-sm">Ozveme se vám co nejdříve.</span>
                </div>
            `;
        }
    });
}

// Init
calculateYearsOfExperience();
