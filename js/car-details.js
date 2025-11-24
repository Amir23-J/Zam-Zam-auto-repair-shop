// Car Details Page JavaScript

let currentCar = null;
let currentImageIndex = 0;
let carImages = [];

// Load car details when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCarDetails();
    setupGalleryControls();
    loadSimilarVehicles();
});

// Get car ID from URL
function getCarId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

// Load car details
function loadCarDetails() {
    const carId = getCarId();
    currentCar = window.carsData.find(car => car.id === carId);

    if (!currentCar) {
        window.location.href = 'cars.html';
        return;
    }

    // Generate multiple placeholder images for gallery
    carImages = generateCarImages(currentCar);

    // Populate all sections
    populateHeader();
    populateGallery();
    populateDetailedSpecs();
    populateFuelEconomy();
    populateDescription();
    populateHighlights();
    populateFeatures();
    populateSpecifications();
}

// Generate placeholder images for gallery
function generateCarImages(car) {
    const images = [];
    const imageCount = 8; // Number of gallery images

    for (let i = 0; i < imageCount; i++) {
        images.push({
            url: car.image || null,
            caption: `${car.year} ${car.make} ${car.model} - View ${i + 1}`
        });
    }

    return images;
}

// Populate header
function populateHeader() {
    document.getElementById('vehicleTitle').textContent =
        `${currentCar.year} ${currentCar.make} ${currentCar.model}`;

    document.getElementById('vehiclePrice').textContent =
        `$${currentCar.price.toLocaleString()}`;

    document.getElementById('conditionBadge').textContent = currentCar.condition;
}

// Populate gallery
function populateGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailGallery = document.getElementById('thumbnailGallery');

    // Set main image
    updateMainImage(0);

    // Create thumbnails
    thumbnailGallery.innerHTML = carImages.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
            <i class="fas fa-car"></i>
        </div>
    `).join('');

    updateImageCounter();
}

// Update main image
function updateMainImage(index) {
    const mainImage = document.getElementById('mainImage');
    currentImageIndex = index;

    // If actual image exists, show it, otherwise show placeholder
    if (carImages[index].url) {
        mainImage.innerHTML = `<img src="${carImages[index].url}" alt="${carImages[index].caption}">`;
    } else {
        mainImage.innerHTML = '<i class="fas fa-car"></i>';
    }

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    updateImageCounter();
}

// Select image from thumbnail
function selectImage(index) {
    updateMainImage(index);
}

// Update image counter
function updateImageCounter() {
    document.getElementById('imageCounter').textContent =
        `${currentImageIndex + 1} / ${carImages.length}`;
}

// Setup gallery controls
function setupGalleryControls() {
    document.getElementById('prevImage').addEventListener('click', () => {
        const newIndex = currentImageIndex === 0 ? carImages.length - 1 : currentImageIndex - 1;
        updateMainImage(newIndex);
    });

    document.getElementById('nextImage').addEventListener('click', () => {
        const newIndex = currentImageIndex === carImages.length - 1 ? 0 : currentImageIndex + 1;
        updateMainImage(newIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            document.getElementById('prevImage').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('nextImage').click();
        }
    });
}

// Populate detailed specs section
function populateDetailedSpecs() {
    // Generate stock number and trim
    const stockNumber = `ZZ${currentCar.id.toString().padStart(4, '0')}`;
    const trim = generateTrim(currentCar);
    const engineSpec = generateEngineSpec(currentCar);
    const transmissionFull = generateTransmissionFull(currentCar);

    // Populate each field
    document.getElementById('detailCondition').textContent = currentCar.condition;
    document.getElementById('detailTrim').textContent = trim;
    document.getElementById('detailMileage').textContent = `${currentCar.mileage.toLocaleString()} miles`;
    document.getElementById('detailStock').textContent = stockNumber;
    document.getElementById('detailEngine').textContent = engineSpec;
    document.getElementById('detailTransmission').textContent = transmissionFull;
    document.getElementById('detailDrivetrain').textContent = currentCar.drivetrain || 'FWD';
    document.getElementById('detailExteriorColor').textContent = currentCar.color;
    document.getElementById('detailInteriorColor').textContent = 'Ebony'; // Default
    document.getElementById('detailFuel').textContent = currentCar.fuelType;
}

// Generate realistic trim level
function generateTrim(car) {
    const trims = {
        'Accord': 'Sport 2.0T',
        'Camry': 'XLE V6',
        'F-150': 'XLT SuperCrew',
        'Altima': 'SV',
        'Silverado': 'LT Crew Cab',
        'Elantra': 'SEL'
    };

    return trims[car.model] || 'Base Model';
}

// Generate full transmission description
function generateTransmissionFull(car) {
    if (car.transmission.toLowerCase().includes('automatic')) {
        // Generate realistic automatic transmission
        if (car.model.toLowerCase().includes('truck') || car.model.toLowerCase().includes('silverado') || car.model.toLowerCase().includes('f-150')) {
            return 'Automatic 10-Speed';
        } else if (car.year >= 2020) {
            return 'Automatic CVT';
        } else {
            return 'Automatic 6-Speed';
        }
    } else {
        return 'Manual 6-Speed';
    }
}

// Populate fuel economy (generate realistic MPG based on vehicle type)
function populateFuelEconomy() {
    const mpgData = generateMPG(currentCar);

    document.getElementById('cityMPG').textContent = mpgData.city;
    document.getElementById('combinedMPG').textContent = mpgData.combined;
    document.getElementById('highwayMPG').textContent = mpgData.highway;

    // Animate fuel bar
    const fuelBar = document.getElementById('fuelBar');
    const percentage = (mpgData.combined / 40) * 100; // Max 40 MPG = 100%
    setTimeout(() => {
        fuelBar.style.width = `${Math.min(percentage, 100)}%`;
    }, 500);
}

// Generate realistic MPG data
function generateMPG(car) {
    let cityBase, highwayBase;

    // Estimate based on vehicle type and year
    if (car.model.toLowerCase().includes('truck') || car.model.toLowerCase().includes('silverado') || car.model.toLowerCase().includes('f-150')) {
        cityBase = 16;
        highwayBase = 22;
    } else if (car.model.toLowerCase().includes('suv')) {
        cityBase = 20;
        highwayBase = 26;
    } else {
        cityBase = 24;
        highwayBase = 32;
    }

    // Adjust for year (newer = better)
    const yearBonus = Math.max(0, (car.year - 2015) * 0.5);

    const city = Math.round(cityBase + yearBonus);
    const highway = Math.round(highwayBase + yearBonus);
    const combined = Math.round((city + highway) / 2);

    return { city, highway, combined };
}

// Populate description
function populateDescription() {
    const description = currentCar.description ||
        `This ${currentCar.year} ${currentCar.make} ${currentCar.model} is in ${currentCar.condition.toLowerCase()} condition with only ${currentCar.mileage.toLocaleString()} miles.

        This vehicle has been thoroughly inspected by our certified technicians and comes with a clean title. The ${currentCar.color} exterior is complemented by a well-maintained interior with premium features.

        Equipped with ${currentCar.transmission} transmission and ${currentCar.fuelType.toLowerCase()} engine, this vehicle offers both performance and reliability. The vehicle includes ${currentCar.features.join(', ')}.

        At Zam Zam Auto Shop, we stand behind every vehicle we sell. This ${currentCar.make} ${currentCar.model} represents excellent value and is ready for its next owner. Schedule a test drive today!`;

    document.getElementById('vehicleDescription').textContent = description;
}

// Populate highlights
function populateHighlights() {
    const highlights = [
        { icon: 'fa-check-circle', text: currentCar.condition + ' Condition' },
        { icon: 'fa-tachometer-alt', text: currentCar.mileage.toLocaleString() + ' Miles' },
        { icon: 'fa-certificate', text: 'Clean Title' },
        { icon: 'fa-user-shield', text: 'Inspected & Certified' },
        { icon: 'fa-tools', text: 'Service Records Available' },
        { icon: 'fa-shield-alt', text: 'Warranty Available' }
    ];

    document.getElementById('highlightsGrid').innerHTML = highlights.map(h => `
        <div class="highlight-item">
            <i class="fas ${h.icon}"></i>
            <span>${h.text}</span>
        </div>
    `).join('');
}

// Populate features
function populateFeatures() {
    const allFeatures = [
        ...currentCar.features,
        'Power Windows',
        'Power Locks',
        'Air Conditioning',
        'AM/FM Radio',
        'Anti-Lock Brakes (ABS)',
        'Electronic Stability Control',
        'Airbags (Front & Side)',
        'Traction Control'
    ];

    // Remove duplicates
    const uniqueFeatures = [...new Set(allFeatures)];

    document.getElementById('featuresList').innerHTML = uniqueFeatures.map(feature => `
        <div class="feature-item">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
        </div>
    `).join('');
}

// Populate specifications
function populateSpecifications() {
    // Generate VIN (fake but realistic)
    const vin = `1ZZZ${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
    const stockNumber = `ZZ${currentCar.id.toString().padStart(4, '0')}`;

    document.getElementById('vinNumber').textContent = vin;
    document.getElementById('stockNumber').textContent = stockNumber;
    document.getElementById('mileageSpec').textContent = currentCar.mileage.toLocaleString() + ' miles';
    document.getElementById('exteriorColor').textContent = currentCar.color;
    document.getElementById('interiorColor').textContent = 'Black'; // Default
    document.getElementById('transmissionSpec').textContent = currentCar.transmission;
    document.getElementById('engineSpec').textContent = generateEngineSpec(currentCar);
    document.getElementById('drivetrainSpec').textContent = currentCar.drivetrain || 'FWD';
    document.getElementById('fuelTypeSpec').textContent = currentCar.fuelType;
    document.getElementById('bodyStyle').textContent = getBodyStyle(currentCar.model);
    document.getElementById('doors').textContent = '4';
}

// Generate engine specification
function generateEngineSpec(car) {
    if (car.model.toLowerCase().includes('truck') || car.model.toLowerCase().includes('silverado') || car.model.toLowerCase().includes('f-150')) {
        return '5.3L V8';
    } else if (car.model.toLowerCase().includes('suv')) {
        return '3.5L V6';
    } else {
        return '2.4L 4-Cylinder';
    }
}

// Get body style from model
function getBodyStyle(model) {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('truck') || modelLower.includes('silverado') || modelLower.includes('f-150')) {
        return 'Pickup Truck';
    } else if (modelLower.includes('suv')) {
        return 'SUV';
    } else {
        return 'Sedan';
    }
}

// Load similar vehicles
function loadSimilarVehicles() {
    const similar = window.carsData
        .filter(car => car.id !== currentCar.id)
        .slice(0, 3);

    const container = document.getElementById('similarVehicles');
    container.innerHTML = similar.map(car => createCarCard(car)).join('');
}

// Create car card for similar vehicles
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
                </div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <div class="car-actions">
                    <a href="car-details.html?id=${car.id}" class="btn btn-primary" style="flex: 1;">
                        <i class="fas fa-info-circle"></i> View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Show inquiry form
function showInquiryForm() {
    document.getElementById('inquiryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close inquiry form
function closeInquiryForm() {
    document.getElementById('inquiryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Schedule test drive
function scheduleTestDrive() {
    alert(`Thank you for your interest in the ${currentCar.year} ${currentCar.make} ${currentCar.model}!\n\nTo schedule a test drive:\n\nCall: (508) 555-1234\nEmail: info@zamzamauto.com\n\nOur team will contact you within 24 hours to arrange a convenient time.`);
}

// Handle inquiry form submission
document.getElementById('inquiryForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thank you for your inquiry about the ${currentCar.year} ${currentCar.make} ${currentCar.model}!\n\nWe've received your message and will contact you within 24 hours.\n\nYou can also call us at (508) 555-1234 for immediate assistance.`);
    closeInquiryForm();
    e.target.reset();
});

// Make functions globally available
window.selectImage = selectImage;
window.showInquiryForm = showInquiryForm;
window.closeInquiryForm = closeInquiryForm;
window.scheduleTestDrive = scheduleTestDrive;
