/**
 * WatiqAI - Premium Website JavaScript
 * Enhanced interactions and animations
 * @version 1.0.0
 * @author WatiqAI Team
 */

'use strict';

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
    animationDuration: 2000,
    observerThreshold: 0.1,
    scrollOffset: 80,
    debounceDelay: 10
};

// ==========================================
// Utility Functions
// ==========================================

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ==========================================
// DOM Ready
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        initScrollProgress();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initScrollReveal();
        initCounterAnimation();
        initParallax();
        initDownloadButton();
        addGeometricShapes();
    } catch (error) {
        console.error('WatiqAI: Initialization error:', error);
    }
});

// ==========================================
// Scroll Progress Indicator
// ==========================================

function initScrollProgress() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.setAttribute('role', 'progressbar');
    indicator.setAttribute('aria-label', 'Page scroll progress');
    document.body.appendChild(indicator);

    const updateProgress = debounce(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        indicator.style.width = `${scrollPercent}%`;
        indicator.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }, CONFIG.debounceDelay);

    window.addEventListener('scroll', updateProgress, { passive: true });
}

// ==========================================
// Navbar Scroll Effect
// ==========================================

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const updateNavbar = debounce(() => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle('scrolled', currentScroll > 50);
    }, CONFIG.debounceDelay);

    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// ==========================================
// Mobile Menu Toggle
// ==========================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// Smooth Scroll Enhancement
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Scroll Reveal Animations
// ==========================================

function initScrollReveal() {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const revealElements = document.querySelectorAll(
        '.problem-card, .feature-card, .impact-card, .moat-card, .stat-box, .sector, .section-header'
    );

    if (!revealElements.length) return;

    const observerOptions = {
        threshold: CONFIG.observerThreshold,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ==========================================
// Counter Animation (Fixed for special characters)
// ==========================================

function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-value, .impact-number, .stat-box-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const text = element.textContent.trim();
    
    // Extract number and preserve prefix/suffix
    const match = text.match(/^([<>]?)(\d+(?:\.\d+)?)(.*?)$/);
    
    if (!match) {
        // Non-numeric values like "Seconds" - just show them
        return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    // Easing function for smooth animation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const timer = setInterval(() => {
        currentStep++;
        const progress = easeOutQuart(currentStep / steps);
        const currentValue = Math.round(targetNum * progress);

        element.textContent = `${prefix}${currentValue}${suffix}`;

        if (currentStep >= steps) {
            element.textContent = text; // Ensure final value is exact
            clearInterval(timer);
        }
    }, stepDuration);
}

// ==========================================
// Parallax Effect
// ==========================================

function initParallax() {
    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const heroDecoration = document.querySelector('.hero-decoration');
    if (!heroDecoration) return;
    
    const handleParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        
        if (scrolled < window.innerHeight) {
            heroDecoration.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }, CONFIG.debounceDelay);

    window.addEventListener('scroll', handleParallax, { passive: true });
}

// ==========================================
// Download Button
// ==========================================

function initDownloadButton() {
    const downloadBtn = document.querySelector('.btn-secondary-large');
    
    if (downloadBtn && downloadBtn.textContent.includes('Download')) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create download link
            const link = document.createElement('a');
            link.href = 'assets/presentations/WatiqAI__Revolutionizing_KYC_with_AI-Powered_Document_Intelligence.pptx';
            link.download = 'WatiqAI_Pitch_Deck.pptx';
            
            // Show feedback
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Downloading...';
            downloadBtn.style.pointerEvents = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setTimeout(() => {
                downloadBtn.textContent = '✓ Downloaded!';
                setTimeout(() => {
                    downloadBtn.textContent = originalText;
                    downloadBtn.style.pointerEvents = '';
                }, 2000);
            }, 500);
        });
    }
}

// ==========================================
// Geometric Background Shapes
// ==========================================

function addGeometricShapes() {
    // Skip decorative shapes if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const shapes = [
        { size: 80, top: '15%', left: '10%', delay: 0 },
        { size: 60, top: '70%', left: '5%', delay: 1 },
        { size: 100, top: '30%', right: '8%', delay: 2 },
        { size: 40, top: '80%', right: '15%', delay: 0.5 },
    ];

    const fragment = document.createDocumentFragment();

    shapes.forEach((shape, index) => {
        const div = document.createElement('div');
        div.className = 'geo-shape';
        div.setAttribute('aria-hidden', 'true');
        div.style.cssText = `
            position: absolute;
            width: ${shape.size}px;
            height: ${shape.size}px;
            border: 2px solid rgba(201, 162, 39, 0.15);
            border-radius: ${index % 2 === 0 ? '50%' : '0'};
            ${shape.top ? `top: ${shape.top};` : ''}
            ${shape.left ? `left: ${shape.left};` : ''}
            ${shape.right ? `right: ${shape.right};` : ''}
            animation: floatShape ${6 + index}s ease-in-out infinite;
            animation-delay: ${shape.delay}s;
            pointer-events: none;
            opacity: 0.5;
        `;
        fragment.appendChild(div);
    });

    hero.appendChild(fragment);

    // Add keyframe animation (only once)
    if (!document.getElementById('geo-shape-styles')) {
        const style = document.createElement('style');
        style.id = 'geo-shape-styles';
        style.textContent = `
            @keyframes floatShape {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(10deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// Intersection Observer for Lazy Loading
// ==========================================

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Magnetic Button Effect
// ==========================================

if (!prefersReducedMotion()) {
    document.querySelectorAll('.btn-primary, .btn-primary-large').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ==========================================
// Typing Effect for Hero Badge (Optional)
// ==========================================

function initTypingEffect() {
    const badge = document.querySelector('.hero-badge');
    if (!badge) return;

    const text = badge.textContent;
    badge.textContent = '';
    badge.style.visibility = 'visible';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            badge.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    setTimeout(typeWriter, 500);
}

// ==========================================
// Page Load Animation
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in body
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    });
});

// ==========================================
// Prevent FOUC (Flash of Unstyled Content)
// ==========================================

document.documentElement.classList.add('js-loading');
window.addEventListener('load', () => {
    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
});
