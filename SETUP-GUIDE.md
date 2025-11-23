# 🚗 ZAM ZAM AUTO SHOP - COMPLETE SETUP GUIDE

## Table of Contents
1. [Quick Start](#quick-start)
2. [Matching Your Business Sign Colors](#matching-sign-colors)
3. [Turning Payment Options On/Off](#payment-setup)
4. [Adding Your Business Information](#business-info)
5. [Payment Gateway Setup](#payment-gateways)
6. [Deployment Guide](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 📋 Quick Start

### Step 1: Update Your Colors (Match Your Sign!)

1. Open the file: `js/config.js`
2. Find the `theme` section (around line 46)
3. Change these colors to match your actual business sign:

```javascript
theme: {
    // PRIMARY COLOR - Main color on your sign
    primaryColor: "#d32f2f",     // ← CHANGE THIS!
    primaryDark: "#9a0007",      // ← CHANGE THIS (darker version)
    primaryLight: "#ff6659",     // ← CHANGE THIS (lighter version)

    // SECONDARY COLOR - Accent color on your sign
    secondaryColor: "#1976d2",   // ← CHANGE THIS!
    secondaryDark: "#004ba0",    // ← CHANGE THIS (darker version)
    secondaryLight: "#63a4ff",   // ← CHANGE THIS (lighter version)
}
```

**How to find your color codes:**
- Take a photo of your sign
- Go to: https://imagecolorpicker.com/
- Upload your photo and click on colors
- Copy the hex code (e.g., #FF0000)

### Step 2: Add Your Business Information

In the same `js/config.js` file, update lines 17-45:

```javascript
business: {
    name: "Zam Zam Auto Shop",           // Your shop name
    phone: "(508) 555-1234",             // Your phone number
    email: "info@zamzamauto.com",        // Your email
    address: "123 Main Street",          // Your street address
    city: "Worcester",                   // Your city
    state: "MA",                         // Your state
    zip: "01608",                        // Your ZIP code

    hours: {
        monday: "8:00 AM - 6:00 PM",     // Your hours
        tuesday: "8:00 AM - 6:00 PM",
        // ... update all days
    }
}
```

### Step 3: Test Locally

1. Open `index.html` in your web browser
2. Check if colors match your sign
3. Verify your contact information is correct
4. Test navigation between pages

---

## 🎨 Matching Your Sign Colors

### Understanding Color Themes

Your website uses 3 versions of each color:

1. **Base Color** - The exact color from your sign
2. **Dark Version** - Used for hover effects (about 30% darker)
3. **Light Version** - Used for accents (about 30% lighter)

### Easy Color Generation

**Option 1: Use a Color Tool**
1. Go to: https://www.tint shadesGenerator.com/
2. Enter your base color
3. It generates dark and light versions automatically

**Option 2: Use Your Brand Colors Exactly**
If you have a style guide with exact colors, use those!

### Example Color Schemes

**Red & Blue (Current)**
```javascript
primaryColor: "#d32f2f",      // Red
secondaryColor: "#1976d2",    // Blue
```

**Green & Black**
```javascript
primaryColor: "#2e7d32",      // Green
secondaryColor: "#212121",    // Black
```

**Orange & Gray**
```javascript
primaryColor: "#f57c00",      // Orange
secondaryColor: "#616161",    // Gray
```

---

## 💳 Payment Setup

### Turning Payments ON

Open `js/config.js` and find the `payments` section (around line 62):

```javascript
payments: {
    enabled: true,  // ← CHANGE FROM false TO true
```

### Enabling Specific Payment Methods

In the same file, scroll down to find each payment method:

#### ✅ **Option 1: Credit Cards (Stripe)**

```javascript
stripe: {
    enabled: true,  // ← Turn ON

    // ADD YOUR KEYS HERE (get from dashboard.stripe.com)
    publishableKey: "pk_test_YOUR_KEY_HERE",
    secretKey: "sk_test_YOUR_KEY_HERE",
}
```

#### ✅ **Option 2: PayPal**

```javascript
paypal: {
    enabled: true,  // ← Turn ON

    // ADD YOUR CLIENT ID (get from developer.paypal.com)
    clientId: "YOUR_PAYPAL_CLIENT_ID",

    mode: "sandbox",  // Use "sandbox" for testing, "production" when live
}
```

#### ✅ **Option 3: Square**

```javascript
square: {
    enabled: true,  // ← Turn ON

    // ADD YOUR IDS (get from developer.squareup.com)
    applicationId: "YOUR_APP_ID",
    locationId: "YOUR_LOCATION_ID",
}
```

#### ✅ **Option 4: Pay in Store (Always Safe)**

```javascript
cashOnPickup: {
    enabled: true,  // ← Already enabled by default
}
```

#### ✅ **Option 5: Pay by Phone (Always Safe)**

```javascript
phoneOrder: {
    enabled: true,  // ← Already enabled by default
}
```

### 🔒 Recommended Setup for Beginners

**SAFEST START** - No online payments yet:
```javascript
payments: {
    enabled: true,  // Turn on payment system

    stripe: { enabled: false },
    paypal: { enabled: false },
    square: { enabled: false },
    cashOnPickup: { enabled: true },   // ✓ Allow pickup
    phoneOrder: { enabled: true }       // ✓ Allow phone orders
}
```

This lets customers:
- Add items to cart
- Submit orders
- You call them to complete payment

**No financial risk!**

---

## 🔐 Payment Gateway Setup

### Setting Up Stripe (Recommended)

**Why Stripe?** Industry standard, very secure, good fees

**Steps:**
1. Go to: https://dashboard.stripe.com/register
2. Create FREE account
3. Complete business verification
4. Get your API keys:
   - Click "Developers" → "API keys"
   - Copy **Publishable key** (starts with `pk_test_`)
   - Copy **Secret key** (starts with `sk_test_`)
5. Paste into `js/config.js`:
```javascript
publishableKey: "pk_test_51AbC...",  // Your publishable key
secretKey: "sk_test_51XyZ...",       // Your secret key (KEEP SECRET!)
```

**Going Live:**
1. In Stripe dashboard, click "Activate your account"
2. Switch keys from `pk_test_` to `pk_live_`
3. In `config.js`, update mode to `production`

### Setting Up PayPal

**Steps:**
1. Go to: https://developer.paypal.com/
2. Log in with your PayPal account
3. Go to "My Apps & Credentials"
4. Create a new app
5. Copy the "Client ID"
6. Paste into `js/config.js`:
```javascript
clientId: "AeF3kL9mN...",  // Your Client ID
```

### Setting Up Square

**Steps:**
1. Go to: https://developer.squareup.com/
2. Sign up for FREE developer account
3. Create an application
4. Get your Application ID and Location ID
5. Paste into `js/config.js`

---

## 📝 Business Information Setup

### Update Contact Details Everywhere

The config file updates most places automatically, but double-check:

**Files to verify:**
- `index.html` - Footer
- `contact.html` - Contact page
- `about.html` - About page

**Search and replace** (use your text editor):
- Find: `(508) 555-1234` → Replace with YOUR phone
- Find: `info@zamzamauto.com` → Replace with YOUR email
- Find: `123 Main Street, Worcester, MA 01608` → Replace with YOUR address

### Adding Your Logo

1. Save your logo as: `images/logo.png`
2. Open each `.html` file
3. Find this section:
```html
<div class="logo">
    <i class="fas fa-car"></i>
    <span>Zam Zam Auto Shop</span>
</div>
```

4. Replace with:
```html
<div class="logo">
    <img src="images/logo.png" alt="Zam Zam Auto Shop" style="height: 40px;">
    <span>Zam Zam Auto Shop</span>
</div>
```

### Adding Vehicle Photos

1. Create folder: `images/cars/`
2. Name photos: `car-1.jpg`, `car-2.jpg`, etc.
3. Open `js/data.js`
4. Add image paths:
```javascript
{
    id: 1,
    make: 'Honda',
    model: 'Accord',
    image: 'images/cars/car-1.jpg',  // ← ADD THIS
    // ... rest of data
}
```

---

## 🌐 Deployment Guide

### Option 1: GitHub Pages (FREE & Easy)

**Steps:**
1. Your code is already on GitHub!
2. Go to your repository settings
3. Click "Pages" in the sidebar
4. Under "Source", select your branch
5. Click "Save"
6. Wait 2-3 minutes
7. Your site is live at: `https://yourusername.github.io/Zam-Zam-auto-repair-shop`

**Custom Domain:**
1. Buy domain (GoDaddy, Namecheap, etc.)
2. In GitHub Pages settings, add your domain
3. Update DNS settings (instructions provided by GitHub)

### Option 2: Netlify (FREE & Super Easy)

**Steps:**
1. Go to: https://www.netlify.com/
2. Sign up for FREE
3. Click "Add new site" → "Import from Git"
4. Connect to GitHub
5. Select your repository
6. Click "Deploy"
7. Your site is live instantly!

**Custom Domain:**
- Netlify provides FREE SSL
- Easy domain setup in settings

### Option 3: Traditional Web Host

If you already have hosting (GoDaddy, Bluehost, etc.):

1. Download all files from GitHub
2. Upload to your web host via FTP
3. Make sure `index.html` is in the root directory
4. Access your site!

---

## 🛠️ Troubleshooting

### Colors Not Changing

**Problem:** Changed colors in `config.js` but site still looks the same

**Solution:**
1. Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Make sure `config.js` is loaded before other scripts:
```html
<script src="js/config.js"></script>  <!-- Must be FIRST! -->
<script src="js/data.js"></script>
<script src="js/cart.js"></script>
```

### Payments Not Showing

**Problem:** Enabled payments but checkout page shows nothing

**Solution:**
1. Check `config.js` - make sure `payments.enabled: true`
2. Check at least ONE payment method is enabled
3. Check browser console for errors (F12)
4. Verify API keys are correct (no extra spaces)

### Cart Not Working

**Problem:** Items don't add to cart

**Solution:**
1. Make sure JavaScript is enabled in browser
2. Check browser console for errors (press F12)
3. Verify `cart.js` is loading: View source and search for "cart.js"
4. Clear browser cache and localStorage

### Images Not Showing

**Problem:** Vehicle or parts images don't display

**Solution:**
1. Check file paths are correct
2. Make sure images are in `images/` folder
3. Check file names match exactly (case-sensitive!)
4. Supported formats: JPG, PNG, WebP

### Contact Form Not Sending

**Current Status:** Form is demo-only (shows alert)

**To Make It Work:**
1. Sign up for Formspree (free): https://formspree.io/
2. Get your form endpoint
3. Update `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 📞 Need Help?

### Quick Checklist Before Asking

- [ ] Tried hard refresh (Ctrl+Shift+R)?
- [ ] Checked browser console for errors?
- [ ] Verified all files uploaded correctly?
- [ ] Read the error message carefully?
- [ ] Checked API keys are correct?

### Getting Support

**For Payment Issues:**
- Stripe: https://support.stripe.com/
- PayPal: https://www.paypal.com/us/smarthelp/
- Square: https://squareup.com/help/

**For Website Issues:**
- Check browser console (F12) for error messages
- Search the error on Google
- Check that all files are in correct folders

---

## ✅ Go-Live Checklist

Before launching to customers:

### Content
- [ ] All business information updated
- [ ] Colors match your sign
- [ ] Logo uploaded and displaying
- [ ] Vehicle inventory added with photos
- [ ] Parts inventory added with prices
- [ ] Contact information correct
- [ ] Social media links updated

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works on mobile
- [ ] Shopping cart adds/removes items
- [ ] Forms validate properly
- [ ] Payment methods tested (if enabled)

### Technical
- [ ] Website deployed and accessible
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if using)
- [ ] Email notifications working (if enabled)
- [ ] Google Analytics added (optional)

### Legal
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] Business license displayed (if required)

### Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox/Safari
- [ ] Tested on mobile phone
- [ ] Tested on tablet
- [ ] Had friend test the site

---

## 🎉 You're Ready to Launch!

Your website is now configured and ready for customers!

**Remember:**
- Start with simple payment options (cash/phone)
- Add online payments when comfortable
- Update inventory regularly
- Respond to inquiries promptly

**Good luck with your new website!** 🚗✨
