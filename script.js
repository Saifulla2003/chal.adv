// Mobile Navbar Toggle (Cross Mark Animation)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
    });
});

// Xtract Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .section-title, .price-card, .loop-card').forEach(el => {
    // On mobile, don't apply this animation to slider cards, as they have their own animation.
    if (window.matchMedia("(max-width: 768px)").matches && el.closest('.slider-track')) {
        return;
    }
    el.style.opacity = "0";
    el.style.transform = "translateY(50px) scale(0.85)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    revealObserver.observe(el);
});

// Tagline Rotator
const taglineElement = document.querySelector('.hero-tagline');
const exploreBtn = document.querySelector('.btn-explore');
const taglines = [
    "Elevating Brands Through Smart Advertising.",
    "Crafting Meaningful Connections for Powerful Brands"
];
let taglineIndex = 0;

if (taglineElement) {
    setInterval(() => {
        // Exit phase: Slide right and fade out
        taglineElement.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        taglineElement.classList.add('fade-out');
        
        if (exploreBtn) {
            exploreBtn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            exploreBtn.classList.add('fade-out');
        }
        
        setTimeout(() => {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            taglineElement.textContent = taglines[taglineIndex];
            
            // Prepare Entry: Jump to left instantly (disable transition)
            taglineElement.style.transition = "none";
            taglineElement.style.transform = "translateX(-50px)";
            void taglineElement.offsetWidth; // Force reflow

            if (exploreBtn) {
                exploreBtn.style.transition = "none";
                exploreBtn.style.transform = "translateX(-50px)";
                void exploreBtn.offsetWidth;
            }
            
            // Enter phase: Slide to center and fade in
            taglineElement.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            taglineElement.style.transform = ""; // Clear inline transform to revert to CSS default (0)
            taglineElement.classList.remove('fade-out');

            if (exploreBtn) {
                exploreBtn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                exploreBtn.style.transform = "";
                exploreBtn.classList.remove('fade-out');
                // Restore hover transition after animation
                setTimeout(() => { exploreBtn.style.transition = ""; }, 800);
            }
        }, 800); // Wait for fade out transition (0.8s)
    }, 5000);
}

// Sticky Support Widget Toggle
const supportToggle = document.getElementById('support-toggle');
const stickyWidget = document.querySelector('.sticky-widget');

if (supportToggle && stickyWidget) {
    supportToggle.addEventListener('click', () => {
        stickyWidget.classList.toggle('active');
        const icon = supportToggle.querySelector('i');
        if (stickyWidget.classList.contains('active')) {
            icon.classList.replace('fa-headset', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-headset');
        }
    });
}

const marquee = document.querySelector(".marquee-content");
if (marquee) marquee.innerHTML += marquee.innerHTML;

// Contact Modal Logic
const contactModal = document.getElementById('contact-modal');
const openContactBtn = document.getElementById('open-contact-form');
const closeContactBtn = document.querySelector('.close-modal');
const inquiryForm = document.getElementById('inquiry-form');

if (openContactBtn && contactModal) {
    openContactBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
    });
}

if (closeContactBtn && contactModal) {
    closeContactBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
    });
    
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.remove('active');
    });
}

if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        
        const subject = encodeURIComponent("New Inquiry from Website");
        const body = encodeURIComponent(`Name: ${name}\r\nPhone: ${phone}\r\nEmail: ${email}\r\n\r\nSent from CHAL Advertisement Website.`);
        
        window.location.href = `mailto:chaladvertisement@gmail.com?subject=${subject}&body=${body}`;
        
        contactModal.classList.remove('active');
        inquiryForm.reset();
    });
}



const lines = document.querySelectorAll(".about-statement .line");

window.addEventListener("scroll", () => {
  lines.forEach(line => {
    const rect = line.getBoundingClientRect();
    const trigger = window.innerHeight * 0.75;

    if (rect.top < trigger) {
      line.classList.add("active");
    }
  });
});

// Hero slider rotation
const heroSlides = document.querySelectorAll('.hero-slider .slide');

if (heroSlides.length) {
    const rotateSlides = () => {
        const visibleSlides = Array.from(heroSlides).filter(s => getComputedStyle(s).display !== 'none');
        if (visibleSlides.length === 0) return;

        let activeIndex = visibleSlides.findIndex(s => s.classList.contains('active'));
        
        if (activeIndex !== -1) {
            visibleSlides[activeIndex].classList.remove('active');
        }
        
        const nextIndex = (activeIndex + 1) % visibleSlides.length;
        visibleSlides[nextIndex].classList.add('active');
    };

    const initSlider = () => {
        const visibleSlides = Array.from(heroSlides).filter(s => getComputedStyle(s).display !== 'none');
        const activeSlide = document.querySelector('.hero-slider .slide.active');
        if (visibleSlides.length > 0 && (!activeSlide || getComputedStyle(activeSlide).display === 'none')) {
            if (activeSlide) activeSlide.classList.remove('active');
            visibleSlides[0].classList.add('active');
        }
    };

    initSlider();
    window.addEventListener('resize', initSlider);
    setInterval(rotateSlides, 5000);
}

// Pricing Card Click Expansion
const pricingCards = document.querySelectorAll('.loop-card');

pricingCards.forEach(card => {
    if (card.closest('.no-highlight')) return;

    card.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other cards
        pricingCards.forEach(c => {
            if (c !== card) c.classList.remove('expanded');
        });
        
        card.classList.toggle('expanded');
    });
});

document.addEventListener('click', () => {
    pricingCards.forEach(c => c.classList.remove('expanded'));
});


/* ============================= */
/* RESPONSIVE CARD SLIDER */
/* ============================= */

document.querySelectorAll(".pricing-slider-wrapper").forEach(wrapper => {
    const cards = wrapper.querySelectorAll(".price-card, .loop-card");
    const prev = wrapper.querySelector(".prev-btn");
    const next = wrapper.querySelector(".next-btn");
    const track = wrapper.querySelector(".slider-track");
    const container = wrapper.querySelector(".slider-container");

    let index = 0;
    let autoSlideInterval;

    function getVisibleCards() {
        if (!cards.length) return 1;
        const cardWidth = cards[0].offsetWidth;
        const containerWidth = container.offsetWidth;
        // Avoid division by zero
        return cardWidth ? Math.round(containerWidth / cardWidth) : 1;
    }

    function updateSlider() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            // --- MOBILE (UNO STYLE) ---
            track.style.transform = "none";
            cards.forEach(c => c.classList.remove("active", "left", "right", "hidden"));

            const total = cards.length;
            const prevIndex = (index - 1 + total) % total;
            const nextIndex = (index + 1) % total;

            cards[index].classList.add("active");
            cards[prevIndex].classList.add("left");
            cards[nextIndex].classList.add("right");

            cards.forEach((c, i) => {
                if (i !== index && i !== prevIndex && i !== nextIndex) {
                    c.classList.add("hidden");
                }
            });
        } else {
            // --- DESKTOP (CAROUSEL) ---
            cards.forEach(c => c.classList.remove("active", "left", "right", "hidden"));

            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            const slideWidth = cardWidth + gap;
            
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    }

    function nextSlide() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const total = cards.length;

        if (isMobile) {
            index = (index + 1) % total;
        } else {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, total - visibleCards);
            
            if (index < maxIndex) {
                index++;
            } else {
                index = 0;
            }
        }
        updateSlider();
    }

    function prevSlide() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const total = cards.length;

        if (isMobile) {
            index = (index - 1 + total) % total;
        } else {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, total - visibleCards);

            if (index > 0) {
                index--;
            } else {
                index = maxIndex;
            }
        }
        updateSlider();
    }

    // Controls
    if (next) next.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    if (prev) prev.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    // Auto Slide
    function startTimer() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetTimer() {
        clearInterval(autoSlideInterval);
        startTimer();
    }

    // Swipe for Mobile
    let touchStartX = 0;
    let isDragging = false;
    let activeCard = null;

    wrapper.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlideInterval);
        
        activeCard = wrapper.querySelector('.price-card.active, .loop-card.active');
        if (activeCard) {
            activeCard.style.transition = 'none';
        }
    }, {passive: true});

    wrapper.addEventListener('touchmove', e => {
        if (!isDragging || !activeCard) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX;
        activeCard.style.transform = `translateX(${diff}px) rotate(${diff * 0.05}deg)`;
    }, {passive: true});

    wrapper.addEventListener('touchend', e => {
        if (!isDragging) return;
        isDragging = false;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;

        if (activeCard) {
            activeCard.style.transition = '';
        }

        if (diff < -50) {
            nextSlide();
        } else if (diff > 50) {
            prevSlide();
        }
        
        if (activeCard) {
            activeCard.style.transform = '';
        }
        resetTimer();
    }, {passive: true});

    // Init
    window.addEventListener('resize', () => {
        updateSlider();
    });
    
    startTimer();
    setTimeout(updateSlider, 100);
});

// Lazy Loading Background Images
(function() {
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

    if ('IntersectionObserver' in window) {
        const lazyBgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundImage = `url('${entry.target.dataset.bg}')`;
                    entry.target.classList.remove('lazy-bg');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px 500px 0px" });

        lazyBackgrounds.forEach(lazyBg => {
            lazyBgObserver.observe(lazyBg);
        });
    }
})();