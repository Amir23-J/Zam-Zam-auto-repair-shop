# Zam Zam Auto Shop Website

A professional, fully-responsive website for Zam Zam Auto Shop in Worcester, MA. This website features auto repair services, car sales inventory, parts & accessories e-commerce, and more.

## Features

### Core Pages
- **Homepage** - Welcoming landing page with hero section, services overview, featured cars, testimonials, and call-to-action sections
- **Services** - Detailed information about all auto repair services offered
- **Cars for Sale** - Inventory of quality pre-owned vehicles with filtering options
- **Parts & Accessories** - E-commerce shop for auto parts with shopping cart functionality
- **About Us** - Company history, values, team information, and certifications
- **Contact** - Contact form, business information, hours, and location details

### Key Features
- ✅ **Multi-Payment Gateway Integration** - Stripe, PayPal, Square with easy on/off controls
- ✅ **Professional Checkout System** - 4-step checkout with multiple payment options
- ✅ **Easy Configuration** - Turn payments on/off, match colors to your sign (all in one file!)
- ✅ **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **E-Commerce Shopping Cart** - Add parts to cart, adjust quantities, and checkout
- ✅ **Vehicle Filtering** - Filter cars by make, price range, and mileage
- ✅ **Parts Search** - Search and filter auto parts by category and keywords
- ✅ **Interactive Forms** - Contact form for customer inquiries
- ✅ **Professional UI/UX** - Modern design with smooth animations and transitions
- ✅ **SEO Optimized** - Proper meta tags and semantic HTML structure
- ✅ **Fast Loading** - Optimized CSS and JavaScript for quick page loads
- ✅ **Cross-Browser Compatible** - Works on all modern browsers

### NEW! Payment Options
- **Stripe** - Credit/debit card processing (most popular)
- **PayPal** - Let customers pay with PayPal
- **Square** - Great if you use Square in-store
- **Pay at Shop** - Free, safe option for pickup
- **Call to Order** - Free, customers call to complete purchase

**All payment methods can be turned ON/OFF with a single setting!**

## Technology Stack

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Custom styling with CSS Grid, Flexbox, animations, and transitions
- **JavaScript (ES6)** - Vanilla JavaScript for interactivity (no frameworks required)
- **Font Awesome 6.4.0** - Professional icons throughout the site
- **LocalStorage API** - Persistent shopping cart storage

## File Structure

```
Zam-Zam-auto-repair-shop/
├── index.html              # Homepage
├── services.html           # Services page
├── cars.html              # Cars for sale page
├── parts.html             # Parts & accessories shop
├── about.html             # About us page
├── contact.html           # Contact page
├── README.md              # This file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── data.js           # Sample data (cars, parts, services)
│   ├── cart.js           # Shopping cart functionality
│   └── main.js           # Main JavaScript functionality
└── images/
    └── (placeholder for images)
```

## 🚀 Quick Start

### For Your Client (Non-Technical)

**📖 Start Here:** Read `PAYMENT-QUICK-START.md` (5-minute read)
- Turn payments ON/OFF with one setting
- Match website colors to business sign
- Choose which payment methods to accept

**📚 Full Guide:** Read `SETUP-GUIDE.md` (Complete instructions)
- Detailed payment setup (Stripe, PayPal, Square)
- Business information updates
- Deployment instructions
- Troubleshooting

### For Developers

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/Zam-Zam-auto-repair-shop.git
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local development server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx http-server
     ```

3. **Configure the site**
   - Edit `js/config.js` to customize everything
   - Update colors, business info, payment settings
   - All configuration in ONE file!

4. **View in browser**
   - Navigate to `http://localhost:8000` (or the appropriate port)

### No Build Process Required
This website uses vanilla HTML, CSS, and JavaScript - no compilation or build process needed!

## ⚙️ Configuration

**Everything is configured in ONE file:** `js/config.js`

### Quick Configuration Checklist

- [ ] Update business colors (match your sign!)
- [ ] Add your contact information
- [ ] Configure payment methods
- [ ] Add your logo
- [ ] Update vehicle inventory
- [ ] Update parts inventory
- [ ] Add social media links

**See `SETUP-GUIDE.md` for detailed instructions!**

## Customization Guide

### Update Business Information

1. **Contact Details** - Update in all HTML files:
   - Phone: `(508) 555-1234` → Your phone number
   - Email: `info@zamzamauto.com` → Your email
   - Address: `123 Main Street, Worcester, MA 01608` → Your address

2. **Business Hours** - Found in footer and contact page:
   ```html
   Mon-Fri: 8AM-6PM, Sat: 9AM-4PM
   ```

3. **Social Media Links** - Update in footer sections:
   ```html
   <a href="#" aria-label="Facebook">
   ```

### Add Real Vehicle Data

Edit `js/data.js` to add your actual vehicle inventory:

```javascript
const carsData = [
    {
        id: 1,
        make: 'Honda',
        model: 'Accord',
        year: 2020,
        price: 18995,
        mileage: 45000,
        // ... more details
    },
    // Add more vehicles...
];
```

### Add Real Parts Data

Edit `js/data.js` to add your actual parts inventory:

```javascript
const partsData = [
    {
        id: 101,
        name: 'Premium Brake Pads Set',
        category: 'Brakes',
        price: 89.99,
        stock: 25,
        // ... more details
    },
    // Add more parts...
];
```

### Upload Vehicle Images

1. Add images to the `images/` folder
2. Update the `image` property in `js/data.js`:
   ```javascript
   image: 'images/2020-honda-accord.jpg'
   ```

3. The CSS will automatically display images when paths are provided

### Color Scheme

Update the color scheme in `css/style.css`:

```css
:root {
    --primary-color: #d32f2f;      /* Main brand color */
    --secondary-color: #1976d2;     /* Secondary brand color */
    --text-dark: #212121;           /* Dark text */
    --text-light: #757575;          /* Light text */
    --bg-light: #f5f5f5;           /* Light background */
}
```

### Update Logo

The current logo is a Font Awesome car icon. To add a custom logo:

1. Add your logo image to the `images/` folder
2. Update the logo HTML in all pages:
   ```html
   <div class="logo">
       <img src="images/your-logo.png" alt="Zam Zam Auto Shop">
       <span>Zam Zam Auto Shop</span>
   </div>
   ```

## Features Explanation

### Shopping Cart
- **Add to Cart** - Parts can be added to cart from the parts page
- **Persistent Storage** - Cart data is saved in browser localStorage
- **Quantity Management** - Increase/decrease quantities or remove items
- **Real-time Updates** - Cart count and total update automatically
- **Checkout** - Simulated checkout process (ready for backend integration)

### Vehicle Filtering
- Filter by make (Honda, Toyota, Ford, etc.)
- Filter by minimum price
- Filter by maximum price
- Filter by maximum mileage
- Real-time filtering as you type/select

### Parts Search
- Search by part name, description, or category
- Filter by category (Brakes, Engine, Electrical, etc.)
- Real-time search with debouncing for performance
- Stock status indicators

### Contact Form
- Client-side validation
- Responsive form layout
- Service selection dropdown
- Success message on submission
- Ready for backend integration

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight** - No heavy frameworks or libraries
- **Fast Loading** - Optimized CSS and JavaScript
- **Minimal Dependencies** - Only Font Awesome CDN
- **Efficient Code** - Modern JavaScript with event delegation
- **Responsive Images** - CSS handles image sizing efficiently

## Future Enhancements

Consider adding these features:

1. **Backend Integration**
   - Connect contact form to email service
   - Implement real checkout with payment processing
   - Add inventory management system
   - User accounts and order history

2. **Advanced Features**
   - Live chat support
   - Online appointment scheduling
   - Vehicle comparison tool
   - Customer reviews and ratings
   - Blog/news section

3. **Marketing**
   - Google Analytics integration
   - SEO optimization
   - Social media integration
   - Email newsletter signup

## Support

For questions or issues with this website:
- Email: info@zamzamauto.com
- Phone: (508) 555-1234
- Visit: 123 Main Street, Worcester, MA 01608

## License

This website is custom-built for Zam Zam Auto Shop. All rights reserved.

---

**Built with care for Zam Zam Auto Shop - Worcester's trusted automotive partner** 🚗
