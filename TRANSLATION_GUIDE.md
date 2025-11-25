# Multi-Language Translation Guide

## Overview

Your website now supports multi-language translations (English, Georgian, Russian). The system is ready - you just need to add the translations!

## How to Add Translations

### Step 1: Edit the Language Files

Open the files in the `lang/` folder:

- `lang/en.json` - English (already filled)
- `lang/ge.json` - Georgian (needs translation)
- `lang/ru.json` - Russian (needs translation)

### Step 2: Replace "TRANSLATE_HERE" Placeholders

Each file has placeholders for text that needs translation. For example:

**Current (in ge.json and ru.json):**

```json
{
  "nav": {
    "home": "TRANSLATE_HERE",
    "services": "TRANSLATE_HERE"
  }
}
```

**After Translation (ge.json example):**

```json
{
  "nav": {
    "home": "საწყისი",
    "services": "სერვისები"
  }
}
```

### Step 3: Key Sections to Translate

1. **Navigation** (`nav` section)

   - home, services, gallery, contact

2. **Hero Section** (`hero` section)

   - title, subtitle, cta button

3. **Why Choose Section** (`why_choose` section)

   - All feature titles and descriptions

4. **Service Area** (`service_area` section)

   - All coverage info texts

5. **Location Widget** (`location_widget` section)

   - Form labels and button text

6. **Footer** (`footer` section)
   - All footer content

### Step 4: Test Your Translations

1. Open your website in a browser
2. Click the language buttons (EN, GE, RU) at the top right
3. Verify all text changes correctly

## File Structure

```
lang/
├── en.json (English - complete)
├── ge.json (Georgian - needs translation)
└── ru.json (Russian - needs translation)
```

## How It Works

- When you click a language button, the `setLanguage()` function loads the appropriate JSON file
- All elements with `data-i18n="key.name"` attributes are automatically updated
- Input placeholders use `data-i18n-placeholder` attribute
- Translations are saved to browser's localStorage, so they persist across page reloads

## Adding Translations to More Pages

If you want to add translations to other pages (services.htm, contact.htm, etc.):

1. Use the same data-i18n attributes in HTML
2. Add the keys to all three language JSON files
3. The existing JavaScript will handle the rest

## Example HTML Usage

```html
<!-- Simple text -->
<h1 data-i18n="hero.title">Professional Evacuation Services</h1>

<!-- Input placeholder -->
<input type="text" data-i18n-placeholder="location_widget.placeholder" />
```

## Current Language Files Location

All files are in: `lang/en.json`, `lang/ge.json`, `lang/ru.json`

Edit these files and replace all "TRANSLATE_HERE" markers with actual translations!
