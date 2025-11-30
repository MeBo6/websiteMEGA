// ===== 1. LANGUAGE MANAGER (ენების გადამრთველი) =====
const LanguageManager = (() => {
    const translationCache = {};
    let currentLanguage = null;
    let translations = {};
    let languageSwitcherButtons = null;
    let loadingTimeout = null;
    let pendingLanguage = null;

    const getInitialLanguage = () => {
        const stored = localStorage.getItem('selectedLanguage');
        return stored || 'ka';
    };

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

    const loadLanguage = async (lang) => {
        if (loadingTimeout) clearTimeout(loadingTimeout);
        pendingLanguage = lang;

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
                const finalLang = pendingLanguage || lang;
                try {
                    const response = await fetch(`./lang/${finalLang}.json?v=${Date.now()}`);
                    if (!response.ok) throw new Error(`Failed to load ${finalLang}.json`);
                    translations = await response.json();
                    translationCache[finalLang] = translations;
                    localStorage.setItem(`translations_${finalLang}`, JSON.stringify(translations));
                    currentLanguage = finalLang;
                    localStorage.setItem('selectedLanguage', finalLang);
                    updatePageContent();
                    updateLanguageButtons();
                    pendingLanguage = null;
                    resolve();
                } catch (error) {
                    console.error('Translation load error:', error);
                    resolve();
                }
            }, 100);
        });
    };

    const t = (key) => {
        const keys = key.split('.');
        let text = translations;
        for (let k of keys) {
            if (!text) return key;
            if (/^\d+$/.test(k)) {
                text = text[parseInt(k)];
            } else {
                text = text[k];
            }
        }
        return text || key;
    };

    const updatePageContent = () => {
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

    const updateLanguageButtons = () => {
        if (!languageSwitcherButtons) {
            languageSwitcherButtons = document.querySelectorAll('.lang-btn');
        }
        languageSwitcherButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLanguage);
        });
    };

    const handleLanguageSwitch = (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLanguage) {
                loadLanguage(lang);
            }
        }
    };

    const init = () => {
        currentLanguage = getInitialLanguage();
        if (loadCachedTranslations(currentLanguage)) {
            translations = translationCache[currentLanguage];
            updatePageContent();
            updateLanguageButtons();
        }
        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            switcher.addEventListener('click', handleLanguageSwitch);
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => loadLanguage(currentLanguage));
        } else {
            loadLanguage(currentLanguage);
        }
    };

    return { init, loadLanguage, getCurrentLanguage: () => currentLanguage, t };
})();

// Initialize Language System
LanguageManager.init();
const t = (key) => LanguageManager.t(key);


// ===== 2. MOBILE MENU & UI =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a regular link
document.querySelectorAll('.nav-links > li > a:not(.dropdown a)').forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Mobile Dropdown Logic
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    dropdownLink.addEventListener('click', function(e) {
        if (window.matchMedia('(max-width: 768px)').matches) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu && !menu.classList.contains('active')) {
                e.preventDefault();
                menu.classList.add('active');
                // Add active class to parent to rotate icon
                dropdown.classList.add('active');
            } else if (menu) {
                // Allow closing by clicking again
                menu.classList.remove('active');
                dropdown.classList.remove('active');
            }
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .feature, .testimonial').forEach(el => observer.observe(el));


// ===== 3. EMAILJS CONTACT FORM =====
// EmailJS ინიციალიზაცია (დარწმუნდით რომ Public Key სწორია)
emailjs.init("s6A_JqGCPv51hEZMh"); 

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'იგზავნება...';

            // Get selected service text safely
            const serviceSelect = document.getElementById('service');
            let serviceText = "";
            if (serviceSelect && serviceSelect.selectedIndex !== -1) {
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                serviceText = selectedOption.text || selectedOption.value;
            }

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value || "არ არის მითითებული",
                phone: document.getElementById('phone').value,
                service: serviceText,
                message: document.getElementById('message').value
            };

            emailjs.send('service_89e1the', 'template_bdqh1dg', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('წერილი წარმატებით გაიგზავნა! ჩვენ მალე გიპასუხებთ.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('სამწუხაროდ, ხარვეზი წარმოიშვა. გთხოვთ მოგვწეროთ WhatsApp-ში.');
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                });
        });
    }
    
    // Allow Enter key for Location Input
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitLocation();
            }
        });
    }
});


// ===== 4. LOCATION FUNCTIONS =====

// ფუნქცია 1: ხელით ჩაწერილის გაგზავნა
function submitLocation() {
    const locationInput = document.getElementById('locationInput');
    const locationValue = locationInput ? locationInput.value.trim() : '';
    
    if (!locationValue) {
        alert('გთხოვთ ჩაწეროთ თქვენი ადგილმდებარეობა');
        return;
    }
    
    const message = `გამარჯობა, მჭირდება ევაკუატორი! ჩემი ლოკაცია: ${locationValue}`;
    const phoneNumber = '+995551305305';
    
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
}

// ფუნქცია 2: GPS ლოკაციის გაგზავნა (ღილაკზე დაჭერისას)
function sendLocationViaWhatsApp(event) {
    if (navigator.geolocation) {
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ლოკაცია იძებნება...';
        btn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // სწორი Google Maps ლინკი
                const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                
                const message = `გამარჯობა, მჭირდება ევაკუატორი! ჩემი ლოკაციაა: ${googleMapsLink}`;
                const phoneNumber = '+995551305305';
                
                window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            function(error) {
                console.error("Geolocation error:", error);
                alert('ვერ ხერხდება ლოკაციის გაგება. დარწმუნდით რომ GPS ჩართულია.');
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