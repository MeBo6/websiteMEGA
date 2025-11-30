// ===== OPTIMIZED TRANSLATION SYSTEM =====
// Performance-optimized language switcher with caching, debouncing, and event delegation

const LanguageManager = (() => {
    const translationCache = {};
    let currentLanguage = null;
    let translations = {};
    let languageSwitcherButtons = null;
    let loadingTimeout = null;
    let pendingLanguage = null;

    // Detect stored language preference or default to Georgian
    const getInitialLanguage = () => {
        const stored = localStorage.getItem('selectedLanguage');
        if (stored) return stored; // Use saved preference if available
        
        // HTML has lang="ka" (Georgian) and all text is Georgian by default,
        // so we return Georgian as the primary language
        return 'ka';
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

// Mobile dropdown menu handling - show/hide on tap for touch devices
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    dropdownLink.addEventListener('click', function(e) {
        // Only prevent default on touch devices for nested dropdowns
        if (window.matchMedia('(max-width: 768px)').matches) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu && !menu.classList.contains('active')) {
                e.preventDefault();
                menu.classList.add('active');
            }
        }
    });
});

// Close dropdown when a submenu item is clicked
const dropdownItems = document.querySelectorAll('.dropdown-menu a');
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        // Close the dropdown menu
        const menu = this.closest('.dropdown-menu');
        if (menu) {
            menu.classList.remove('active');
        }
        // Close mobile menu only when a submenu item is clicked (not on Services parent link)
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when a regular nav link is clicked (but not dropdown parent)
const regularNavLinks = document.querySelectorAll('.nav-links > li > a:not(.dropdown a)');
regularNavLinks.forEach(item => {
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
    const currentLocation = location.pathname;
    const currentHash = location.hash;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        const linkHash = new URL(link.href, window.location.origin).hash;
        
        // Check if page matches
        if (linkPath === currentLocation) {
            // If on services page, check hash anchors
            if (currentLocation.includes('services.html') && currentHash) {
                // Only active if hash matches
                link.classList.toggle('active', linkHash === currentHash);
            } else if (linkHash === '' && currentHash === '') {
                // Active if both have no hash
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load and when hash changes
window.addEventListener('load', setActiveNavLink);
window.addEventListener('hashchange', setActiveNavLink);

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
    window.location.href = 'tel:+995551305305';
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
    const message = `ჩემი ლოკაცია: ${location}`;
    
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

// EMAILJS CONTACT FORM HANDLER
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'იგზავნება...';
            
            // Prepare template parameters
            const templateParams = {
                to_email: 'megaplusrustavi@gmail.com',
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value || 'მოუხსენებელი',
                message: document.getElementById('message').value
            };
            
            // Send email via EmailJS
            emailjs.send('service_89e1the', 'template_bdqh1dg', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('წერილი წარმატებით გაიგზავნა! ჩვენ მალე გიპასუხებთ.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('სამწუხაროდ, ხარვეზი წარმოიშვა. გთხოვთ ცადეთ მეორე ჯერ ან დაგვირეკეთ.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }
});

// SEND LOCATION VIA WHATSAPP
// Note: In HTML, make sure to call it like this: onclick="sendLocationViaWhatsApp(event)"
function sendLocationViaWhatsApp(event) {
    if (navigator.geolocation) {
        // ღილაკის ვიზუალის შეცვლა
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span style="color: white;">⏳</span> ლოკაცია იძებნება...';
        btn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // ✅ შესწორებულია: Google Maps-ის სტანდარტული ლინკი
                const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                
                // მესიჯის ფორმირება
                const message = `გამარჯობა, მჭირდება ევაკუატორი! ჩემი ლოკაციაა: ${googleMapsLink}`;
                const phoneNumber = '+995551305305';
                const encodedMessage = encodeURIComponent(message);
                
                // WhatsApp-ის გახსნა
                window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
                
                // ღილაკის დაბრუნება საწყის მდგომარეობაში
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            function(error) {
                // შეცდომის დამუშავება
                console.error("Geolocation error:", error); // კარგია კონსოლშიც ჩანდეს
                alert('ვერ ხერხდება ლოკაციის გაგება. დარწმუნდით, რომ GPS ჩართულია და ბრაუზერს აქვს უფლება.');
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        alert('თქვენს ბრაუზერს არ აქვს გეოლოკაციის მხარდაჭერა.');
    }
}
