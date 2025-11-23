// Main JavaScript for Zam Zam Auto Shop

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const quickServices = document.querySelector('.quick-services');
            if (quickServices) {
                quickServices.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Load featured cars on homepage
    const featuredCarsGrid = document.getElementById('featuredCarsGrid');
    if (featuredCarsGrid && window.carsData) {
        loadFeaturedCars();
    }

    // Load all cars on cars page
    const allCarsGrid = document.getElementById('allCarsGrid');
    if (allCarsGrid && window.carsData) {
        loadAllCars();
        setupCarFilters();
    }

    // Load all parts on parts page
    const allPartsGrid = document.getElementById('allPartsGrid');
    if (allPartsGrid && window.partsData) {
        loadAllParts();
        setupPartFilters();
    }

    // Setup contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// Load Featured Cars (first 3)
function loadFeaturedCars() {
    const featuredCarsGrid = document.getElementById('featuredCarsGrid');
    const featured = window.carsData.slice(0, 3);

    featuredCarsGrid.innerHTML = featured.map(car => createCarCard(car)).join('');
}

// Load All Cars
function loadAllCars(filters = {}) {
    const allCarsGrid = document.getElementById('allCarsGrid');
    let cars = [...window.carsData];

    // Apply filters
    if (filters.make) {
        cars = cars.filter(car => car.make === filters.make);
    }
    if (filters.minPrice) {
        cars = cars.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
        cars = cars.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    if (filters.maxMileage) {
        cars = cars.filter(car => car.mileage <= parseInt(filters.maxMileage));
    }

    if (cars.length === 0) {
        allCarsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #757575;">No vehicles found matching your criteria.</div>';
        return;
    }

    allCarsGrid.innerHTML = cars.map(car => createCarCard(car)).join('');
}

// Create Car Card HTML
function createCarCard(car) {
    return `
        <div class="car-card">
            <div class="car-image">
                <i class="fas fa-car"></i>
                ${car.condition === 'Like New' || car.condition === 'Excellent' ?
                    `<div class="car-badge">${car.condition}</div>` : ''}
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.year} ${car.make} ${car.model}</h3>
                <div class="car-details">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.mileage.toLocaleString()} mi</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuelType}</span>
                </div>
                <div class="car-features">
                    ${car.features.slice(0, 3).map(feature =>
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <div class="car-actions">
                    <button class="btn btn-primary" onclick="viewCarDetails(${car.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn-secondary" onclick="inquireCar(${car.id})">
                        <i class="fas fa-phone"></i> Inquire
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load All Parts
function loadAllParts(filters = {}) {
    const allPartsGrid = document.getElementById('allPartsGrid');
    let parts = [...window.partsData];

    // Apply filters
    if (filters.category && filters.category !== 'all') {
        parts = parts.filter(part => part.category === filters.category);
    }
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        parts = parts.filter(part =>
            part.name.toLowerCase().includes(searchTerm) ||
            part.description.toLowerCase().includes(searchTerm) ||
            part.category.toLowerCase().includes(searchTerm)
        );
    }

    if (parts.length === 0) {
        allPartsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #757575;">No parts found matching your criteria.</div>';
        return;
    }

    allPartsGrid.innerHTML = parts.map(part => createPartCard(part)).join('');
}

// Create Part Card HTML
function createPartCard(part) {
    const stockClass = part.stock > 10 ? 'in-stock' : 'low-stock';
    const stockText = part.stock > 10 ? 'In Stock' : `Low Stock (${part.stock})`;

    return `
        <div class="part-card">
            <div class="part-image">
                <i class="fas fa-cog"></i>
            </div>
            <div class="part-info">
                <div class="part-category">${part.category}</div>
                <h3 class="part-title">${part.name}</h3>
                <p class="part-description">${part.description}</p>
                <div class="part-price">$${part.price.toFixed(2)}</div>
                <div class="stock-status ${stockClass}">${stockText}</div>
                <button class="btn btn-primary" onclick="addPartToCart(${part.id})" style="width: 100%;">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Setup Car Filters
function setupCarFilters() {
    const makeFilter = document.getElementById('makeFilter');
    const minPriceFilter = document.getElementById('minPriceFilter');
    const maxPriceFilter = document.getElementById('maxPriceFilter');
    const maxMileageFilter = document.getElementById('maxMileageFilter');

    const applyFilters = () => {
        const filters = {
            make: makeFilter ? makeFilter.value : '',
            minPrice: minPriceFilter ? minPriceFilter.value : '',
            maxPrice: maxPriceFilter ? maxPriceFilter.value : '',
            maxMileage: maxMileageFilter ? maxMileageFilter.value : ''
        };
        loadAllCars(filters);
    };

    if (makeFilter) makeFilter.addEventListener('change', applyFilters);
    if (minPriceFilter) minPriceFilter.addEventListener('input', applyFilters);
    if (maxPriceFilter) maxPriceFilter.addEventListener('input', applyFilters);
    if (maxMileageFilter) maxMileageFilter.addEventListener('input', applyFilters);
}

// Setup Part Filters
function setupPartFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchFilter = document.getElementById('searchFilter');

    const applyFilters = () => {
        const filters = {
            category: categoryFilter ? categoryFilter.value : 'all',
            search: searchFilter ? searchFilter.value : ''
        };
        loadAllParts(filters);
    };

    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (searchFilter) {
        let searchTimeout;
        searchFilter.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
    }
}

// View Car Details
function viewCarDetails(carId) {
    const car = window.carsData.find(c => c.id === carId);
    if (!car) return;

    const details = `
Vehicle Details:
${car.year} ${car.make} ${car.model}

Price: $${car.price.toLocaleString()}
Mileage: ${car.mileage.toLocaleString()} miles
Transmission: ${car.transmission}
Fuel Type: ${car.fuelType}
Color: ${car.color}
Condition: ${car.condition}

Features:
${car.features.map(f => '• ' + f).join('\n')}

${car.description}

Contact us at (508) 555-1234 to schedule a test drive!
    `;

    alert(details);
}

// Inquire about Car
function inquireCar(carId) {
    const car = window.carsData.find(c => c.id === carId);
    if (!car) return;

    alert(`Thank you for your interest in the ${car.year} ${car.make} ${car.model}!\n\nPlease contact us:\nPhone: (508) 555-1234\nEmail: info@zamzamauto.com\n\nOr visit us at:\n123 Main Street, Worcester, MA 01608\n\nWe look forward to hearing from you!`);
}

// Add Part to Cart
function addPartToCart(partId) {
    const part = window.partsData.find(p => p.id === partId);
    if (!part) return;

    if (part.stock === 0) {
        alert('Sorry, this item is out of stock.');
        return;
    }

    window.cart.addItem({
        id: part.id,
        name: part.name,
        price: part.price,
        type: 'part'
    });
}

// Handle Contact Form Submit
function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // In a real application, this would send to a server
    alert(`Thank you for contacting Zam Zam Auto Shop!\n\nWe've received your message and will get back to you shortly.\n\nName: ${data.name}\nEmail: ${data.email}\n\nOne of our team members will contact you within 24 hours.`);

    e.target.reset();
}

// Scroll to top button (optional enhancement)
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});
