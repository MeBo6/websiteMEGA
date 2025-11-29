<header class="header">
        <nav class="navbar">
            <a href="index.htm" class="logo" style="text-decoration: none; cursor: pointer;">
                <img src="Photos/Logo.png" alt="MEGA+ Logo">
                <div class="logo-text">
                    <div class="company-name">MEGA+ Towing</div>
                    <div class="tagline">Fast & Reliable</div>
                </div>
            </a>
            <ul class="nav-links">
                <li><a href="index.htm" class="active">Home</a></li>
                <li class="dropdown">
                <li><a href="services.htm">Services <i class="fas fa-chevron-down dropdown-icon"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="services.htm#towing">Towing Service</a></li>
                        <li><a href="services.htm#recovery">Heavy Recovery</a></li>
                        <li><a href="services.htm#roadside">Roadside Assistance</a></li>
                        <li><a href="services.htm#storage">Vehicle Storage</a></li>
                    </ul>
                </li>
                <li><a href="pricing.htm">Pricing</a></li>
                <li><a href="gallery.htm">Photo Gallery</a></li>
                <li><a href="contact.htm">Contact</a></li>
            </ul>
            <div class="header-contact">
                <a href="tel:+995551305305" class="phone-link">
                    <i class="fas fa-phone"></i> +995 551 305 305
                </a>
            </div>
            <div class="language-switcher">
                <button class="lang-btn active" data-lang="en" onclick="setLanguage('en')">EN</button>
                <button class="lang-btn" data-lang="ge" onclick="setLanguage('ge')">GE</button>
                <button class="lang-btn" data-lang="ru" onclick="setLanguage('ru')">RU</button>
            </div>
            <div class="mobile-menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    </header>



.header {
    background-color: var(--white);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.navbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.75rem 3%;
    max-width: 1400px;
    margin: 0 auto;
    gap: 1rem;
}

/* Logo container styling */
.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    white-space: nowrap;
    margin-right: 2rem;
}

.logo img {
    height: 75px;
    width: auto;
    display: block;
    flex-shrink: 0;
}

.logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1em;
    white-space: nowrap;
}

.logo-text .company-name {
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
    margin: 0;
    line-height: 1;
}

.logo-text .tagline {
    font-size: 0.75rem;
    color: #DC143C;
    letter-spacing: 0.05em;
    line-height: 1;
}

/* Navigation links list */
.nav-links {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    flex: 1;
}

.nav-links li {
    position: relative;
    margin-right: 2.5rem;
}

.nav-links li:last-child {
    margin-right: 0;
}

.nav-links a {
    text-decoration: none;
    color: var(--dark-text);
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.3s ease;
    white-space: nowrap;
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-links a:hover {
    color: var(--primary-color);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.dropdown-icon {
    font-size: 0.75em;
    margin-left: 0.3em;
    transition: transform 0.3s ease;
}

/* --- Dropdown Menu Styling --- */

.dropdown {
    position: relative;
}

/* The dropdown menu itself (hidden by default) */
.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    padding: 0;
    border-radius: 4px;
    list-style: none;
    margin: 0;
    z-index: 1000;
}

/* Show the dropdown menu when hovering over the parent 'dropdown' li */
.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
}

.dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
}

/* Links inside the dropdown */
.dropdown-menu li {
    margin: 0;
}

.dropdown-menu a {
    display: block;
    padding: 0.75rem 1.25rem;
    font-weight: 500;
    color: var(--dark-text);
    white-space: nowrap;
    transition: background-color 0.3s ease;
    text-decoration: none;
}

.dropdown-menu a:hover {
    background-color: var(--light-bg);
    color: var(--primary-color);
}

.mobile-menu-toggle {
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--secondary-color);
}

/* Language Switcher */
.language-switcher {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    height: 100%;
    flex-shrink: 0;
}

.lang-btn {
    padding: 0.5rem 0.75rem;
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Header Contact */
.header-contact {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.phone-link {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.phone-link:hover {
    color: var(--secondary-color);
    transform: scale(1.05);
}

.phone-link i {
    font-size: 1rem;
}