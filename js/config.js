/**
 * ========================================
 * ZAM ZAM AUTO SHOP - CONFIGURATION FILE
 * ========================================
 *
 * This file controls all major settings for your website.
 * Simply change "true" to "false" to turn features on/off.
 *
 * EASY SETUP GUIDE:
 * 1. Scroll to PAYMENT SETTINGS below
 * 2. Set enabled: true for payment methods you want to use
 * 3. Add your API keys (get these from Stripe/PayPal/Square)
 * 4. Save this file and refresh your website!
 */

// ============================================
// BUSINESS INFORMATION
// ============================================
const CONFIG = {
    business: {
        name: "Zam Zam Auto Shop",
        tagline: "Worcester's Trusted Auto Repair & Car Sales Experts",
        phone: "(508) 555-1234",
        email: "info@zamzamauto.com",
        address: "123 Main Street",
        city: "Worcester",
        state: "MA",
        zip: "01608",

        // Business Hours
        hours: {
            monday: "8:00 AM - 6:00 PM",
            tuesday: "8:00 AM - 6:00 PM",
            wednesday: "8:00 AM - 6:00 PM",
            thursday: "8:00 AM - 6:00 PM",
            friday: "8:00 AM - 6:00 PM",
            saturday: "9:00 AM - 4:00 PM",
            sunday: "Closed"
        }
    },

    // ============================================
    // THEME COLORS - MATCHED TO ZAM ZAM SIGN!
    // ============================================
    theme: {
        // Primary brand color - BLUE (from your sign)
        primaryColor: "#1565C0",        // Professional Blue
        primaryDark: "#0D47A1",         // Darker Blue
        primaryLight: "#42A5F5",        // Lighter Blue

        // Secondary brand color - YELLOW (from your sign)
        secondaryColor: "#FFC107",      // Golden Yellow
        secondaryDark: "#FF8F00",       // Amber
        secondaryLight: "#FFD54F",      // Light Yellow

        // Keep these or adjust as needed
        textDark: "#212121",
        textLight: "#757575",
        bgLight: "#f5f5f5",
        white: "#ffffff",
        black: "#000000",
        success: "#4caf50",
        warning: "#ff9800",
        error: "#f44336"
    },

    // ============================================
    // PAYMENT SETTINGS - TURN ON/OFF HERE!
    // ============================================
    payments: {
        // Master switch - turn ALL payments on/off
        enabled: false,  // SET TO true WHEN READY TO ACCEPT PAYMENTS

        // Tax rate (set to your state's sales tax rate)
        taxRate: 0.0625,  // 6.25% for Massachusetts

        // Shipping settings
        shipping: {
            enabled: true,
            freeShippingOver: 100,  // Free shipping on orders over $100
            flatRate: 9.99          // Standard shipping cost
        },

        // ==================
        // STRIPE PAYMENTS
        // ==================
        stripe: {
            enabled: false,  // SET TO true TO ENABLE STRIPE

            // Get these keys from: https://dashboard.stripe.com/apikeys
            publishableKey: "pk_test_YOUR_PUBLISHABLE_KEY_HERE",  // Starts with pk_test_ or pk_live_
            secretKey: "KEEP_THIS_SECRET",  // Never share this! Starts with sk_test_ or sk_live_

            // Display settings
            displayName: "Credit/Debit Card",
            description: "Secure payment via Stripe",
            icon: "credit-card",

            // Accepted cards
            acceptedCards: ["Visa", "Mastercard", "American Express", "Discover"]
        },

        // ==================
        // PAYPAL PAYMENTS
        // ==================
        paypal: {
            enabled: false,  // SET TO true TO ENABLE PAYPAL

            // Get this from: https://developer.paypal.com/
            clientId: "YOUR_PAYPAL_CLIENT_ID_HERE",

            // Use 'sandbox' for testing, 'production' for real payments
            mode: "sandbox",  // CHANGE TO 'production' WHEN GOING LIVE

            // Display settings
            displayName: "PayPal",
            description: "Pay with your PayPal account",
            icon: "paypal",
            color: "#0070ba"
        },

        // ==================
        // SQUARE PAYMENTS
        // ==================
        square: {
            enabled: false,  // SET TO true TO ENABLE SQUARE

            // Get these from: https://developer.squareup.com/
            applicationId: "YOUR_SQUARE_APPLICATION_ID",
            locationId: "YOUR_SQUARE_LOCATION_ID",

            // Use 'sandbox' for testing, 'production' for real payments
            mode: "sandbox",  // CHANGE TO 'production' WHEN GOING LIVE

            // Display settings
            displayName: "Square",
            description: "Secure payment processing",
            icon: "square",
            color: "#006aff"
        },

        // ==================
        // CASH ON PICKUP
        // ==================
        cashOnPickup: {
            enabled: true,  // Allow customers to pay when they pick up
            displayName: "Pay at Shop",
            description: "Pay when you pick up your order",
            icon: "store",
            instructions: "Please bring payment when you come to pick up your parts. We accept cash and cards in-store."
        },

        // ==================
        // PHONE ORDER
        // ==================
        phoneOrder: {
            enabled: true,  // Allow customers to call to complete payment
            displayName: "Call to Order",
            description: "Complete your order over the phone",
            icon: "phone",
            instructions: "Call us at (508) 555-1234 to complete your order and payment."
        }
    },

    // ============================================
    // FEATURE TOGGLES
    // ============================================
    features: {
        // Shopping cart for parts
        shoppingCart: true,

        // Show cars for sale
        showCars: true,

        // Show parts & accessories
        showParts: true,

        // Contact form
        contactForm: true,

        // Email notifications when someone places an order
        emailNotifications: {
            enabled: false,  // Turn on when you set up email
            adminEmail: "orders@zamzamauto.com"
        },

        // Google Analytics (for tracking visitors)
        analytics: {
            enabled: false,
            trackingId: "UA-XXXXXXXXX-X"  // Get from Google Analytics
        },

        // Facebook Pixel (for ads)
        facebookPixel: {
            enabled: false,
            pixelId: "YOUR_PIXEL_ID"
        }
    },

    // ============================================
    // SECURITY SETTINGS
    // ============================================
    security: {
        // reCAPTCHA (prevents spam on contact form)
        recaptcha: {
            enabled: false,
            siteKey: "YOUR_RECAPTCHA_SITE_KEY"
        },

        // HTTPS requirement
        requireHttps: true
    },

    // ============================================
    // SOCIAL MEDIA LINKS
    // ============================================
    social: {
        facebook: "",  // Add your Facebook page URL
        instagram: "", // Add your Instagram URL
        twitter: "",   // Add your Twitter URL
        google: "",    // Add your Google Business URL
        yelp: ""       // Add your Yelp page URL
    }
};

// ============================================
// APPLY THEME COLORS AUTOMATICALLY
// ============================================
function applyThemeColors() {
    const root = document.documentElement;
    const theme = CONFIG.theme;

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--secondary-dark', theme.secondaryDark);
    root.style.setProperty('--secondary-light', theme.secondaryLight);
    root.style.setProperty('--text-dark', theme.textDark);
    root.style.setProperty('--text-light', theme.textLight);
    root.style.setProperty('--bg-light', theme.bgLight);
    root.style.setProperty('--success', theme.success);
    root.style.setProperty('--warning', theme.warning);
}

// Apply theme colors when page loads
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyThemeColors);
    } else {
        applyThemeColors();
    }
}

// Make CONFIG available globally
window.CONFIG = CONFIG;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Check if any payment method is enabled
function isPaymentEnabled() {
    const p = CONFIG.payments;
    return p.enabled && (
        p.stripe.enabled ||
        p.paypal.enabled ||
        p.square.enabled ||
        p.cashOnPickup.enabled ||
        p.phoneOrder.enabled
    );
}

// Get list of enabled payment methods
function getEnabledPaymentMethods() {
    const methods = [];
    const p = CONFIG.payments;

    if (!p.enabled) return methods;

    if (p.stripe.enabled) methods.push({type: 'stripe', ...p.stripe});
    if (p.paypal.enabled) methods.push({type: 'paypal', ...p.paypal});
    if (p.square.enabled) methods.push({type: 'square', ...p.square});
    if (p.cashOnPickup.enabled) methods.push({type: 'cash', ...p.cashOnPickup});
    if (p.phoneOrder.enabled) methods.push({type: 'phone', ...p.phoneOrder});

    return methods;
}

window.isPaymentEnabled = isPaymentEnabled;
window.getEnabledPaymentMethods = getEnabledPaymentMethods;
