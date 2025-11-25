# MEGA+ Towing Website

Professional towing and recovery services website with multi-language support (English, Georgian, Russian).

## 📋 Project Overview

This is a responsive website for MEGA+ Towing services, featuring:

- Multi-page navigation (Home, Services, Gallery, Contact)
- 24/7 emergency towing services
- Multi-language support (EN, GE, RU)
- Responsive design for mobile, tablet, and desktop
- Contact forms and location widgets
- Service gallery with lightbox

## 🗂️ Project Structure

```
website-deploy/
├── index.htm              # Home page
├── services.htm           # Services page
├── gallery.htm            # Photo gallery page
├── contact.htm            # Contact page
├── script.js              # Main JavaScript (translations, mobile menu, lightbox)
├── styles.css             # Main stylesheet
├── styles-footer.css      # Footer styles
├── compress-images.ps1    # PowerShell script for image compression
├── lang/                  # Language files folder
│   ├── en.json           # English translations
│   ├── ge.json           # Georgian translations
│   └── ru.json           # Russian translations
├── Photos/               # Image assets folder
└── Random/               # Additional resources
```

## 🌐 Language Support

The website supports three languages with easy switching via buttons in the header:

- **EN** - English
- **GE** - Georgian
- **RU** - Russian

All content is managed in JSON files in the `lang/` folder. See [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) for details on adding/updating translations.

## 📱 Key Features

### 1. Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Sticky call button for quick contact

### 2. Multi-Language System

- Automatic text translation
- Language preference saved to browser localStorage
- Easy to add new languages

### 3. Service Gallery

- Lightbox image viewer
- Keyboard navigation (arrows, escape)
- Image counter
- Touch-friendly on mobile

### 4. Contact System

- Contact form with validation
- Location widget for quick help
- Direct phone links
- Working hours display

### 5. SEO Ready

- Clean semantic HTML
- Meta tags for sharing
- Performance optimized

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git (for version control)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MeBo6/MEGA-_Website.git
   cd website-deploy
   ```

2. Open `index.htm` in your browser to view the website

3. For development, use a local web server:
   ```bash
   python -m http.server 8000
   # or use Live Server extension in VS Code
   ```

## 📝 Editing Content

### Updating Text Content

1. Open `lang/en.json` (English)
2. Find the text key and update the value
3. Update corresponding translations in `lang/ge.json` and `lang/ru.json`
4. Save and refresh the browser

### Updating Images

1. Replace images in the `Photos/` folder
2. Update image paths in HTML files if needed
3. Use the `compress-images.ps1` script to optimize image sizes

### Styling Changes

1. Edit `styles.css` for main styles
2. Edit `styles-footer.css` for footer-specific styles
3. Use CSS variables defined in `:root` for consistent colors

## 🔧 Maintenance

### Adding a New Language

1. Create a new JSON file in `lang/` folder (e.g., `lang/fr.json`)
2. Copy structure from `lang/en.json`
3. Translate all content
4. Modify `script.js` to include the new language option

### Updating Contact Information

- **Phone**: Update in all language files (`lang/*.json`)
- **Email**: Update in language files
- **Address**: Update in contact page and language files

### Managing Images

- Use `compress-images.ps1` to optimize images:
  ```powershell
  .\compress-images.ps1
  ```
- Recommended image sizes:
  - Hero section: 1920x600px
  - Gallery: 800x600px minimum
  - Logo: 60x60px

## 💡 Best Practices

1. **Always backup** before making major changes
2. **Test on multiple devices** after updates
3. **Validate JSON files** when editing language files
4. **Use git commits** to track changes
5. **Optimize images** before uploading
6. **Test translations** on all language versions

## 🐛 Troubleshooting

### Translations not showing

- Check browser console for JSON errors
- Verify `data-i18n` attributes match JSON keys
- Clear browser cache and localStorage

### Images not loading

- Verify image paths in HTML
- Check file names match (case-sensitive)
- Use absolute or relative paths consistently

### Styling issues

- Clear browser cache (Ctrl+Shift+Del)
- Check CSS for conflicting rules
- Use browser DevTools to debug

## 📞 Contact Information

- **Phone**: +995 551 305 305
- **Email**: megaplusrustavi@gmail.com
- **Service Area**: Georgia (Rustavi primarily)
- **Hours**: 24/7 Emergency Service

## 📄 Documentation Files

- [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) - Guide for managing translations
- [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) - Maintenance and updates guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Guide for deploying to production

## 📊 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📜 License

© 2025 MEGA+ Towing. All rights reserved.

## 👨‍💻 Author

Created and maintained by MeBo6

---

**Last Updated**: November 21, 2025
