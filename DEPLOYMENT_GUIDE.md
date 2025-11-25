# Deployment Guide

Complete guide for deploying the MEGA+ Towing website to production.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deployment Options](#deployment-options)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Post-Deployment Testing](#post-deployment-testing)
5. [Troubleshooting](#troubleshooting)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

Before deploying, verify the following:

### Content Review

- [ ] All text is correct and properly translated
- [ ] No placeholder text remains
- [ ] Phone numbers are correct
- [ ] Email addresses are correct
- [ ] All links work
- [ ] No broken images

### Technical Validation

- [ ] All JSON files have valid syntax
- [ ] CSS is minified (optional but recommended)
- [ ] JavaScript is tested in all browsers
- [ ] Images are optimized (<200KB each)
- [ ] HTML validates (W3C standards)
- [ ] No console errors in browser
- [ ] Mobile responsiveness verified

### Performance

- [ ] Page Speed Insights score > 80
- [ ] All pages load < 3 seconds
- [ ] Images use appropriate formats
- [ ] Unnecessary files removed

### Security

- [ ] No sensitive information in files
- [ ] Forms properly validated
- [ ] No hardcoded passwords/API keys
- [ ] HTTPS certificate ready

### Testing

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Mobile browsers tested
- [ ] All languages working
- [ ] Contact form tested

---

## Deployment Options

### Option 1: GitHub Pages (Free, Simple)

**Best for:** Static websites with no backend

**Pros:**

- Free hosting
- Automatic deployments
- Built-in SSL/HTTPS
- Easy to set up

**Cons:**

- Static only (no PHP/backend)
- Limited customization
- Rate limiting

**Setup Steps:**

1. Push code to `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch
4. Website accessible at `https://username.github.io/repo-name`

### Option 2: Netlify (Free with Pro options)

**Best for:** Modern static sites with good features

**Pros:**

- Free tier generous
- Automatic deployments from Git
- Built-in SSL
- Form handling
- Redirects support

**Cons:**

- Requires Git repository
- Some features in Pro tier

**Setup Steps:**

1. Sign up at netlify.com
2. Connect Git repository
3. Set build command: (leave empty for static)
4. Set publish directory: `/`
5. Deploy

### Option 3: Traditional Web Hosting

**Best for:** More control, custom domain, email hosting

**Providers:**

- Bluehost
- HostGator
- GoDaddy
- SiteGround

**Pros:**

- Full control
- Email hosting included
- Subdomain support
- 24/7 support

**Cons:**

- Requires manual uploads
- More technical setup
- Ongoing costs

---

## Step-by-Step Deployment

### Using GitHub Pages

#### Step 1: Create GitHub Account & Repository

```bash
# If not already done
# 1. Go to github.com
# 2. Create account
# 3. Create new repository: "website-deploy"
```

#### Step 2: Push to GitHub

```bash
cd c:\Users\User\Desktop\website-deploy

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - website ready for deployment"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/website-deploy.git
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Select Source: Deploy from a branch
4. Select Branch: `main` / `/(root)`
5. Save

#### Step 4: Access Your Site

- Your site will be available at: `https://YOUR_USERNAME.github.io/website-deploy/`

#### Step 5: Custom Domain (Optional)

1. In GitHub Pages settings, add custom domain
2. Update domain DNS records to point to GitHub
3. GitHub will handle SSL automatically

---

### Using Netlify

#### Step 1: Connect Repository

```bash
# 1. Go to netlify.com
# 2. Click "New site from Git"
# 3. Choose GitHub
# 4. Authorize Netlify
# 5. Select your repository
```

#### Step 2: Configure Build

- Build command: (leave empty)
- Publish directory: `/`
- No environment variables needed

#### Step 3: Deploy

- Click "Deploy site"
- Netlify will provide temporary URL
- Site accessible immediately

#### Step 4: Custom Domain

1. In Site settings → Domain management
2. Add custom domain
3. Update DNS records
4. SSL automatically enabled

---

### Using Traditional Hosting (FTP/SFTP)

#### Step 1: Get Hosting Credentials

- Host: ftp.yourhost.com (or SFTP)
- Username: your_username
- Password: your_password
- Port: 21 (FTP) or 22 (SFTP)

#### Step 2: Connect via FTP Client

**Using FileZilla (recommended):**

1. Download FileZilla from filezilla-project.org
2. Open Site Manager (Ctrl+M)
3. Create new site
4. Enter FTP credentials
5. Connect

#### Step 3: Upload Files

1. In FileZilla, navigate to public_html folder
2. Upload all website files:
   - `.htm` files
   - `.js` files
   - `styles*.css` files
   - `lang/` folder
   - `Photos/` folder
   - `Random/` folder

#### Step 4: Set Index Page

Most hosts automatically serve `index.htm` or `index.html`

#### Step 5: Test

Visit your domain to verify files are online

---

## Post-Deployment Testing

### Immediate Testing (First 15 minutes)

```
[ ] Website accessible via URL
[ ] Page loads completely
[ ] All images display
[ ] CSS styling applied
[ ] No console errors
[ ] Mobile version works
```

### Functional Testing (First hour)

```
[ ] All navigation links work
[ ] All internal links work
[ ] External links work (social media, etc.)
[ ] Phone numbers are clickable (tel: links)
[ ] Email links work (mailto:)
[ ] Language switching works
[ ] Contact form submits
[ ] Gallery loads images
[ ] Mobile menu opens/closes
[ ] Sticky button visible and works
```

### Cross-Browser Testing

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile
- [ ] Safari Mobile (iOS)

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Small mobile (360x640)

### Performance Testing

1. Use Google PageSpeed Insights:

   - Go to pagespeed.web.dev
   - Enter your URL
   - Check scores (aim for >80)

2. Check Core Web Vitals:
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

### SEO Testing

```bash
# Check on search engines (takes time to index)
site:yourdomain.com

# Verify robots.txt if using one
yourdomain.com/robots.txt

# Check sitemap.xml if created
yourdomain.com/sitemap.xml
```

---

## Troubleshooting

### Issue: Files Not Uploading

**Solution:**

1. Check FTP credentials
2. Verify correct directory (usually public_html)
3. Check file permissions
4. Use SFTP instead of FTP (more secure)

### Issue: 404 Errors

**Solution:**

1. Verify file names match exactly
2. Check capitalization (Linux servers are case-sensitive)
3. Verify correct file paths
4. Ensure index.htm exists in root

### Issue: CSS/Images Not Loading

**Solution:**

1. Check file paths are relative or absolute
2. Verify files uploaded to correct location
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check console for 404 errors

### Issue: Forms Not Working

**Solution:**

1. Contact hosting provider about backend support
2. If using Netlify, enable form handling
3. Verify form `action` attribute is correct
4. Check email configuration

### Issue: Slow Performance

**Solution:**

1. Check PageSpeed Insights recommendations
2. Compress images further
3. Enable GZIP compression on server
4. Use CDN for static assets
5. Check server response time

---

## Monitoring & Maintenance

### Weekly Monitoring

```bash
# Check site is accessible
curl https://yourdomain.com/

# Check SSL certificate
# Use browser or: https://www.sslshopper.com/ssl-checker.html

# Monitor for errors
# Check browser console, server logs
```

### Automated Monitoring

Consider using:

- **UptimeRobot** (Monitor if site is up)
- **Google Search Console** (SEO monitoring)
- **Cloudflare Analytics** (Traffic analytics)

### Backup Strategy After Deployment

```bash
# Weekly backups
git add .
git commit -m "Backup - $(date)"
git push origin main

# Or export files:
# zip -r backup-2025-01-15.zip .
```

---

## Performance Optimization Post-Deployment

### Enable Caching

**In .htaccess (if using Apache):**

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 week"
  ExpiresByType text/css "access plus 1 week"
</IfModule>
```

### Enable GZIP Compression

**In .htaccess:**

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### CDN Setup (Optional)

Use Cloudflare for:

- Free SSL
- Automatic caching
- DDoS protection
- Performance optimization

Setup: cloudflare.com → Add site → Update nameservers

---

## SSL/HTTPS Setup

### Check Current Status

Visit: https://yourdomain.com

### If Using GitHub Pages or Netlify

- SSL is **automatic** ✓

### If Using Traditional Hosting

1. Contact hosting provider
2. They usually provide free SSL (Let's Encrypt)
3. Enable in control panel (cPanel, Plesk, etc.)
4. Wait 15-30 minutes for activation

### Force HTTPS

**In .htaccess:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## Deployment Rollback

If something goes wrong:

```bash
# View recent commits
git log --oneline -10

# Find the commit before the bad deployment
# Revert to that commit
git revert <commit-hash>
git push origin main

# For immediate action
git reset --hard <good-commit-hash>
git push -f origin main  # Force push (use carefully)
```

---

## DNS Configuration

If using custom domain:

**Update these DNS records at your domain registrar:**

```
Type    | Name    | Value
--------|---------|---------------------------
CNAME   | www     | yourhost.github.io (or Netlify URL)
A       | @       | [IP from provider]
MX      | @       | [Email server if needed]
TXT     | @       | [Verification if needed]
```

---

## Checklist: Ready for Deployment

- [ ] All files tested locally
- [ ] Git repository clean and up-to-date
- [ ] All links verified
- [ ] Images optimized
- [ ] Translations complete
- [ ] SSL certificate ready
- [ ] Domain DNS configured
- [ ] Hosting account ready
- [ ] Backup created
- [ ] Monitoring tools set up
- [ ] Team notified of deployment

---

**Last Updated:** November 21, 2025
**Next Review:** Monthly post-deployment monitoring recommended

---

**Need Help?**

- GitHub Pages: https://pages.github.com/
- Netlify: https://www.netlify.com/
- Hosting Providers: Check their documentation
