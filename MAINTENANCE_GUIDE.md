# Website Maintenance Guide

A comprehensive guide for maintaining and updating the MEGA+ Towing website.

## 📋 Table of Contents

1. [Regular Maintenance Tasks](#regular-maintenance-tasks)
2. [Updating Content](#updating-content)
3. [Managing Images](#managing-images)
4. [Performance Optimization](#performance-optimization)
5. [Backup & Recovery](#backup--recovery)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## Regular Maintenance Tasks

### Daily Tasks

- Monitor contact form submissions
- Check for broken links
- Verify phone links are working

### Weekly Tasks

- Review website analytics
- Check for 404 errors
- Verify all pages load correctly
- Test language switching

### Monthly Tasks

- Update testimonials (if applicable)
- Review and update service prices if needed
- Check SSL certificate status
- Verify email notifications are working
- Run full browser compatibility tests

### Quarterly Tasks

- Audit page load times
- Review and optimize images
- Update outdated information
- Check for security updates
- Backup website files

### Annually Tasks

- Full content review
- Update copyright year
- Review and update all translations
- Comprehensive accessibility audit
- Performance baseline measurement

---

## Updating Content

### Updating Phone Numbers

**All locations to update:**

1. `lang/en.json` - English language file
2. `lang/ge.json` - Georgian language file
3. `lang/ru.json` - Russian language file

**Steps:**

1. Open the language file
2. Find `"phone"` key
3. Update the phone number
4. Save and test

**Example:**

```json
"phone": "Phone: +995 551 305 305"
```

### Updating Service Hours

**Location:** `lang/en.json` (and other language files)

**Find:** `working_hours` and `hours_text`

**Example:**

```json
"working_hours": "Working Hours",
"hours_text": "24/7 emergency service<br>Office: 8:00 - 18:00 (Mon-Fri)"
```

### Updating Services

1. Open `services.htm`
2. Find the service section
3. Update HTML content and add `data-i18n` attributes
4. Add translation keys to all language files (`lang/*.json`)

### Updating Team Members

**If you want to add/remove team members:**

1. Open `index.htm` or `contact.htm` (wherever team is displayed)
2. Modify the team member cards
3. Update corresponding translations in language files

### Updating Testimonials

**Location:** Language files under `testimonials` section

```json
"testimonials": {
  "title": "What Our Clients Say",
  "testimonial1_text": "Great service!",
  "testimonial1_author": "Client Name"
}
```

---

## Managing Images

### Image Optimization

Use the included PowerShell script to compress images:

```powershell
cd c:\Users\User\Desktop\website-deploy
.\compress-images.ps1
```

### Recommended Image Sizes

| Purpose         | Size     | Format | Max KB |
| --------------- | -------- | ------ | ------ |
| Hero Background | 1920x600 | JPG    | 300    |
| Gallery Images  | 800x600  | JPG    | 150    |
| Thumbnails      | 300x300  | JPG    | 50     |
| Logo            | 60x60    | PNG    | 20     |
| Service Icons   | 100x100  | PNG    | 30     |

### Adding New Images

1. **Optimize** the image (reduce to recommended size)
2. **Place** in `Photos/` folder
3. **Update** HTML file with correct path
4. **Test** on multiple devices
5. **Verify** load times

### Image Path Examples

```html
<!-- From HTML in root -->
<img src="Photos/hero-image.jpg" alt="Hero" />

<!-- From HTML in subfolder -->
<img src="../Photos/logo.png" alt="Logo" />
```

---

## Performance Optimization

### Check Page Speed

1. Use Google PageSpeed Insights: https://pagespeed.web.dev/
2. Monitor Core Web Vitals
3. Aim for:
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

### Optimization Tips

#### 1. Image Optimization

```bash
# Use ImageMagick or online tools to compress
# Target: 70% quality for JPG, 8-bit PNG
```

#### 2. Minify CSS & JavaScript

- Remove comments and whitespace
- Use minification tools
- Combine multiple files if possible

#### 3. Caching Strategy

- Enable browser caching in server config
- Set cache headers for static assets
- Use CloudFlare or similar CDN

#### 4. Lazy Loading Images

```html
<img src="photo.jpg" alt="Photo" loading="lazy" />
```

---

## Backup & Recovery

### Creating Backups

#### Manual Backup

```bash
# Using Git (recommended)
git add .
git commit -m "Backup - $(date)"
git push origin main

# Using zip (alternative)
Compress-Archive -Path "." -DestinationPath "website-backup-$(Get-Date -Format 'yyyy-MM-dd').zip"
```

#### Automated Backup Strategy

1. **Daily**: Commit changes to Git
2. **Weekly**: Create full backup to external storage
3. **Monthly**: Store backup off-site

### Restoring from Backup

#### Using Git

```bash
# View commit history
git log --oneline

# Restore specific file
git checkout <commit-hash> -- filename

# Restore entire commit
git revert <commit-hash>
```

#### Using Zip Backup

1. Extract backup zip file
2. Compare with current version
3. Manually merge differences
4. Test thoroughly

---

## Common Issues & Solutions

### Issue: Translations Not Showing

**Symptoms:** Page shows `data-i18n` keys instead of text

**Solutions:**

1. Validate JSON files for syntax errors
2. Check browser console for errors
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Clear localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

### Issue: Images Not Loading

**Symptoms:** Broken image icons appear

**Solutions:**

1. Verify image file exists in Photos folder
2. Check file name spelling (case-sensitive)
3. Verify correct path in HTML
4. Test with absolute URL:
   ```html
   <img src="https://yoursite.com/Photos/image.jpg" />
   ```

### Issue: Styling Broken

**Symptoms:** Page looks wrong, missing styles

**Solutions:**

1. Clear browser cache
2. Verify CSS file paths are correct
3. Check for conflicting CSS rules
4. Use browser DevTools (F12) to inspect
5. Validate CSS syntax

### Issue: Mobile Menu Not Working

**Symptoms:** Mobile menu doesn't open/close

**Solutions:**

1. Check JavaScript console for errors
2. Verify `.mobile-menu-toggle` element exists
3. Check CSS media queries
4. Test on actual mobile device

### Issue: Form Not Submitting

**Symptoms:** Submit button doesn't work

**Solutions:**

1. Check console for JavaScript errors
2. Verify form input names are correct
3. Test form fields have values
4. Check backend service/email configuration

### Issue: Page Slow to Load

**Symptoms:** Page takes long to appear

**Solutions:**

1. Run PageSpeed Insights analysis
2. Compress images
3. Minify CSS/JavaScript
4. Reduce unused code
5. Enable gzip compression on server

---

## Version Control Workflow

### Making Updates Safely

```bash
# 1. Create a feature branch
git checkout -b feature/update-services

# 2. Make your changes
# (edit files)

# 3. Test thoroughly
# (open in browser, check all languages, etc.)

# 4. Commit changes
git add .
git commit -m "Update services information"

# 5. Push to repository
git push origin feature/update-services

# 6. Merge to main when tested
git checkout main
git merge feature/update-services
git push origin main
```

### Emergency Rollback

```bash
# If something breaks, revert to previous version
git log --oneline  # Find problematic commit
git revert <commit-hash>
git push origin main
```

---

## Monitoring Checklist

### Monthly Website Check

- [ ] All pages load correctly
- [ ] All links work (internal and external)
- [ ] Phone numbers are clickable
- [ ] Email links work
- [ ] Language switching works
- [ ] Contact form submissions work
- [ ] Gallery images load
- [ ] Mobile responsive design works
- [ ] Browser compatibility verified
- [ ] Page speed acceptable
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] Backups created

---

## Emergency Contacts

- **Website Admin**: [Your Contact Info]
- **Hosting Support**: [Hosting Provider Info]
- **Technical Issues**: Check Git history for recent changes

---

**Last Updated:** November 21, 2025
**Maintenance Schedule:** Monthly reviews recommended
