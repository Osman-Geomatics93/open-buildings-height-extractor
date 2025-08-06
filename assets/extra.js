/* ==========================================
   🚀 MODERN BUILDING HEIGHTS EXTRACTION HUB
   Interactive JavaScript with Animations
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // === INITIALIZATION === //
    initScrollAnimations();
    initProgressBar();
    initSmoothScrolling();
    initThemeToggleAnimation();
    initParallaxEffects();
    initTypingAnimation();
    initTableSorting();
    initLoadingStates();
    initTooltips();
    
    console.log('🏙️ Building Heights Hub initialized with modern features!');
});

// === SCROLL ANIMATIONS === //
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all content elements
    const animateElements = document.querySelectorAll(`
        .md-typeset h1,
        .md-typeset h2,
        .md-typeset h3,
        .md-typeset div[style*="background"],
        .md-typeset table,
        .md-typeset .highlight,
        .md-typeset blockquote
    `);

    animateElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// === READING PROGRESS BAR === //
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / docHeight) * 100;
        
        progressBar.style.width = Math.min(progress, 100) + '%';
        
        // Add glow effect when near completion
        if (progress > 90) {
            progressBar.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
        } else {
            progressBar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
}

// === SMOOTH SCROLLING ENHANCEMENTS === //
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add highlight effect
                target.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    target.style.animation = '';
                }, 1000);
            }
        });
    });
}

// === THEME TOGGLE ANIMATION === //
function initThemeToggleAnimation() {
    const themeToggle = document.querySelector('[data-md-color-scheme]');
    if (themeToggle) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-md-color-scheme') {
                    document.body.style.transition = 'all 0.3s ease';
                    document.body.style.transform = 'scale(0.98)';
                    
                    setTimeout(() => {
                        document.body.style.transform = 'scale(1)';
                    }, 150);
                    
                    setTimeout(() => {
                        document.body.style.transition = '';
                    }, 300);
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme']
        });
    }
}

// === PARALLAX EFFECTS === //
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('div[style*="linear-gradient"]');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// === TYPING ANIMATION === //
function initTypingAnimation() {
    const titles = document.querySelectorAll('.md-typeset h1:first-child');
    
    titles.forEach((title) => {
        if (title.textContent.includes('🏙️')) {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid';
            
            let index = 0;
            function typeWriter() {
                if (index < text.length) {
                    title.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            }
            
            setTimeout(typeWriter, 500);
        }
    });
}

// === TABLE SORTING === //
function initTableSorting() {
    if (typeof Tablesort !== 'undefined') {
        const tables = document.querySelectorAll('.md-typeset table');
        tables.forEach((table) => {
            if (table.querySelector('th')) {
                new Tablesort(table);
                
                // Add sort indicators
                table.querySelectorAll('th').forEach(th => {
                    th.style.cursor = 'pointer';
                    th.style.position = 'relative';
                    th.addEventListener('click', function() {
                        this.style.animation = 'pulse 0.3s ease-in-out';
                        setTimeout(() => {
                            this.style.animation = '';
                        }, 300);
                    });
                });
            }
        });
    }
}

// === LOADING STATES === //
function initLoadingStates() {
    // Simulate loading for dynamic content
    const codeBlocks = document.querySelectorAll('.md-typeset .highlight');
    
    codeBlocks.forEach((block, index) => {
        block.classList.add('loading');
        
        setTimeout(() => {
            block.classList.remove('loading');
            block.style.animation = 'fadeInUp 0.6s ease-out';
        }, 200 + (index * 100));
    });
}

// === ENHANCED TOOLTIPS === //
function initTooltips() {
    // Add tooltips to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('data-tooltip')) {
            const domain = new URL(link.href).hostname;
            link.setAttribute('data-tooltip', `Visit ${domain}`);
        }
        
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Add tooltips to code elements
    const codeElements = document.querySelectorAll('.md-typeset code:not(pre code)');
    codeElements.forEach(code => {
        if (code.textContent.length > 20) {
            code.setAttribute('data-tooltip', code.textContent);
            code.style.cursor = 'help';
        }
    });
}

// === DYNAMIC BACKGROUND PATTERNS === //
function createBackgroundPattern() {
    const patterns = ['dots', 'grid', 'waves'];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            background-image: radial-gradient(circle, #667eea 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
}

// === SCROLL SPY FOR NAVIGATION === //
function initScrollSpy() {
    const sections = document.querySelectorAll('.md-typeset h2, .md-typeset h3');
    const navLinks = document.querySelectorAll('.md-nav__link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.background = 'rgba(102, 126, 234, 0.1)';
            } else {
                link.style.background = '';
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// === KEYBOARD SHORTCUTS === //
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.md-search__input');
            if (searchInput) {
                searchInput.focus();
                searchInput.style.animation = 'pulse 0.3s ease-in-out';
            }
        }
        
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const themeToggle = document.querySelector('[data-md-color-scheme] button');
            if (themeToggle) {
                themeToggle.click();
            }
        }
    });
}

// === PERFORMANCE MONITORING === //
function initPerformanceMonitoring() {
    // Monitor loading performance
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
        
        // Show loading complete notification
        if (loadTime > 3000) {
            console.log('⚠️ Slow loading detected. Consider optimizing assets.');
        }
    });
}

// === INITIALIZE ADDITIONAL FEATURES === //
setTimeout(() => {
    createBackgroundPattern();
    initScrollSpy();
    initKeyboardShortcuts();
    initPerformanceMonitoring();
}, 1000);

// === UTILITY FUNCTIONS === //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for global use
window.BuildingHeightsHub = {
    initScrollAnimations,
    initProgressBar,
    initSmoothScrolling,
    debounce,
    throttle
};
