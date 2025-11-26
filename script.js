// ===== OPTIMIZED TRANSLATION SYSTEM =====
// Performance-optimized language switcher with caching, debouncing, and event delegation

const LanguageManager = (() => {
    const translationCache = {};
    let currentLanguage = null;
    let translations = {};
    let languageSwitcherButtons = null;
    let loadingTimeout = null;
    let pendingLanguage = null;

    // Detect browser language or use stored preference
    const getInitialLanguage = () => {
        const stored = localStorage.getItem('selectedLanguage');
        if (stored) return stored;
        const browserLang = navigator.language.split('-')[0];
        return ['en', 'ge', 'ru'].includes(browserLang) ? browserLang : 'en';
    };

    // Load translations from localStorage cache
    const loadCachedTranslations = (lang) => {
        try {
            const cached = localStorage.getItem(`translations_${lang}`);
            if (cached) {
                translationCache[lang] = JSON.parse(cached);
                return true;
            }
        } catch (e) {
            console.warn('Failed to load cached translations:', e);
        }
        return false;
    };

    // Load translations with caching and debouncing
    const loadLanguage = async (lang) => {
        // Debounce rapid language switches
        if (loadingTimeout) clearTimeout(loadingTimeout);
        pendingLanguage = lang;

        // Return cached version immediately
        if (translationCache[lang]) {
            translations = translationCache[lang];
            currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            updatePageContent();
            updateLanguageButtons();
            pendingLanguage = null;
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            loadingTimeout = setTimeout(async () => {
                // Use most recent requested language
                const finalLang = pendingLanguage || lang;
                
                try {
                    const response = await fetch(`./lang/${finalLang}.json?v=${Date.now()}`);
                    if (!response.ok) throw new Error(`Failed to load ${finalLang}.json`);
                    translations = await response.json();
                    translationCache[finalLang] = translations;
                    // Persist to localStorage for cross-page access
                    localStorage.setItem(`translations_${finalLang}`, JSON.stringify(translations));
                    currentLanguage = finalLang;
                    localStorage.setItem('selectedLanguage', finalLang);
                    updatePageContent();
                    updateLanguageButtons();
                    pendingLanguage = null;
                    resolve();
                } catch (error) {
                    console.error('Translation load error:', error);
                    if (finalLang !== 'en') {
                        loadLanguage('en').then(resolve);
                    } else {
                        resolve();
                    }
                }
            }, 100);
        });
    };

    // Get translated text with nested key and array index support
    const t = (key) => {
        const keys = key.split('.');
        let text = translations;
        for (let k of keys) {
            if (!text) return key;
            // Check if k is a number (array index)
            if (/^\d+$/.test(k)) {
                text = text[parseInt(k)];
            } else {
                text = text[k];
            }
        }
        return text || key;
    };

    // Batch DOM updates for better performance
    const updatePageContent = () => {
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = t(key);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                element.placeholder = t(key);
            });
        });

        // Update page title based on language
        updatePageTitle();
    };

    // Update page title based on current language
    const updatePageTitle = () => {
        const titles = {
            'en': 'Auto Help MEGA+ 24/7',
            'ge': 'ავტო დახმარება მეგა+ 24/7',
            'ru': 'Авто Помощь МЕГА+ 24/7'
        };
        document.title = titles[currentLanguage] || titles['en'];
    };

    // Update button states (memoized selector)
    const updateLanguageButtons = () => {
        if (!languageSwitcherButtons) {
            languageSwitcherButtons = document.querySelectorAll('.lang-btn');
        }
        languageSwitcherButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLanguage);
        });
    };

    // Event delegation handler
    const handleLanguageSwitch = (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLanguage) {
                loadLanguage(lang);
            }
        }
    };

    // Initialize language system
    const init = () => {
        currentLanguage = getInitialLanguage();
        
        // Try to load from localStorage cache first for instant display
        if (loadCachedTranslations(currentLanguage)) {
            translations = translationCache[currentLanguage];
            updatePageContent();
            updateLanguageButtons();
        }
        
        // Attach event delegation to switcher
        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            switcher.addEventListener('click', handleLanguageSwitch);
        }

        // Load initial language (will fetch if not in cache)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => loadLanguage(currentLanguage));
        } else {
            loadLanguage(currentLanguage);
        }
    };

    // Public API
    return {
        init,
        loadLanguage,
        getCurrentLanguage: () => currentLanguage,
        t
    };
})();

// For backward compatibility, expose global t() function
const t = (key) => LanguageManager.t(key);

// Initialize on script load
LanguageManager.init();


// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll to services section
function scrollToServices() {
    const servicesSection = document.querySelector('.services-preview');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add active class to current navigation link
function setActiveNavLink() {
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
window.addEventListener('load', setActiveNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and other sections
document.querySelectorAll('.service-card, .feature, .testimonial').forEach(element => {
    observer.observe(element);
});

// Form submission handling (for contact page)
// Let Formspree handle the submission naturally
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // No preventDefault - allow Formspree to process the form
    // Form will submit and Formspree will redirect to success page
}

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'block';
    } else {
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Emergency call button with phone number
function callEmergency() {
    window.location.href = 'tel:+15551234567';
}

// Analytics tracking (placeholder)
function trackPageView(pageName) {
    console.log('Page viewed:', pageName);
    // You can integrate Google Analytics or other tracking here
}

// Track page views
trackPageView(document.title);

// LOCATION WIDGET FUNCTIONALITY
function submitLocation() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert('Please enter or select your location');
        return;
    }
    
    // Create message with location
    const message = `EMERGENCY: My location is: ${location}`;
    
    // Call directly with message
    const phoneNumber = '+995551305305';
    const encodedMessage = encodeURIComponent(message);
    
    // Try to open WhatsApp first (better for emergencies)
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
    
    // Also initiate phone call
    setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
    }, 500);
}

// Allow Enter key to submit location
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitLocation();
            }
        });
    }
});

// SEND LOCATION VIA WHATSAPP
function sendLocationViaWhatsApp() {
    if (navigator.geolocation) {
        // Show loading state
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span style="color: white;">⏳</span> Getting location...';
        btn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const googleMapsLink = `https://maps.google.com/?q=${lat},${lng}`;
                
                // Create message with location
                const message = `I need emergency towing service! My location: ${googleMapsLink}`;
                const phoneNumber = '+995551305305';
                const encodedMessage = encodeURIComponent(message);
                
                // Open WhatsApp with message
                window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
                
                // Reset button
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            function(error) {
                alert('Could not access your location. Please enable location services and try again.');
                // Reset button
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        );
    } else {
        alert('Your browser does not support location services.');
    }
}
