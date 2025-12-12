// Sample Data for Zam Zam Auto Shop

// Cars for Sale
const carsData = [
    {
        id: 1,
        make: 'Honda',
        model: 'Accord',
        year: 2020,
        price: 18995,
        mileage: 45000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Silver',
        features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
        condition: 'Excellent',
        description: 'Well-maintained Honda Accord with low mileage. Single owner, full service history.',
        image: null
    },
    {
        id: 2,
        make: 'Toyota',
        model: 'Camry',
        year: 2019,
        price: 17500,
        mileage: 52000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Blue',
        features: ['Sunroof', 'Leather Seats', 'Navigation'],
        condition: 'Excellent',
        description: 'Reliable Toyota Camry in excellent condition. Clean title, non-smoker.',
        image: null
    },
    {
        id: 3,
        make: 'Ford',
        model: 'F-150',
        year: 2021,
        price: 32995,
        mileage: 28000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Black',
        features: ['4WD', 'Towing Package', 'Apple CarPlay'],
        condition: 'Like New',
        description: 'Powerful F-150 truck with minimal use. Perfect for work or weekend adventures.',
        image: null
    },
    {
        id: 4,
        make: 'Nissan',
        model: 'Altima',
        year: 2018,
        price: 14995,
        mileage: 68000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'White',
        features: ['Bluetooth', 'Keyless Entry', 'Power Windows'],
        condition: 'Good',
        description: 'Affordable and reliable sedan. Great gas mileage, well-maintained.',
        image: null
    },
    {
        id: 5,
        make: 'Chevrolet',
        model: 'Silverado',
        year: 2020,
        price: 29995,
        mileage: 35000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Red',
        features: ['Crew Cab', 'Tow Package', 'Bed Liner'],
        condition: 'Excellent',
        description: 'Heavy-duty Silverado ready for any job. Excellent towing capacity.',
        image: null
    },
    {
        id: 6,
        make: 'Hyundai',
        model: 'Elantra',
        year: 2021,
        price: 16995,
        mileage: 22000,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        color: 'Gray',
        features: ['Warranty', 'Backup Camera', 'Bluetooth'],
        condition: 'Like New',
        description: 'Nearly new Elantra with remaining factory warranty. Excellent fuel economy.',
        image: null
    }
];

// Parts & Accessories
const partsData = [
    {
        id: 101,
        name: 'Premium Brake Pads Set',
        category: 'Brakes',
        price: 89.99,
        stock: 25,
        description: 'High-quality ceramic brake pads for smooth, quiet braking. Fits most sedan models.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 102,
        name: 'Full Synthetic Motor Oil (5W-30)',
        category: 'Fluids',
        price: 34.99,
        stock: 50,
        description: 'Premium full synthetic motor oil for superior engine protection. 5 quart jug.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 103,
        name: 'Air Filter - High Flow',
        category: 'Engine',
        price: 24.99,
        stock: 40,
        description: 'High-performance air filter for improved airflow and engine efficiency.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 104,
        name: 'LED Headlight Bulbs (Pair)',
        category: 'Lighting',
        price: 69.99,
        stock: 15,
        description: 'Ultra-bright LED headlight bulbs. 6000K white light, easy installation.',
        compatibility: 'H11/9005/9006',
        image: null
    },
    {
        id: 105,
        name: 'All-Season Floor Mats',
        category: 'Interior',
        price: 49.99,
        stock: 30,
        description: 'Durable rubber floor mats to protect your interior. Custom-fit design.',
        compatibility: 'Universal Trim-to-Fit',
        image: null
    },
    {
        id: 106,
        name: 'Battery - 650 CCA',
        category: 'Electrical',
        price: 129.99,
        stock: 12,
        description: 'Premium automotive battery with 650 cold cranking amps. 3-year warranty.',
        compatibility: 'Group 24/24F',
        image: null
    },
    {
        id: 107,
        name: 'Windshield Wiper Blades (Pair)',
        category: 'Exterior',
        price: 19.99,
        stock: 45,
        description: 'Premium beam-style wiper blades for streak-free visibility.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 108,
        name: 'Spark Plugs - Iridium (Set of 4)',
        category: 'Engine',
        price: 39.99,
        stock: 35,
        description: 'Long-lasting iridium spark plugs for optimal engine performance.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 109,
        name: 'Cabin Air Filter',
        category: 'HVAC',
        price: 16.99,
        stock: 40,
        description: 'High-efficiency cabin air filter removes dust, pollen, and odors.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 110,
        name: 'Heavy-Duty Car Cover',
        category: 'Exterior',
        price: 79.99,
        stock: 8,
        description: 'Weather-resistant car cover protects against rain, snow, and UV rays.',
        compatibility: 'Fits Sedans/SUVs',
        image: null
    },
    {
        id: 111,
        name: 'Tire Pressure Monitoring System',
        category: 'Tires',
        price: 59.99,
        stock: 20,
        description: 'Digital TPMS with LCD display. Monitor all four tires in real-time.',
        compatibility: 'Universal',
        image: null
    },
    {
        id: 112,
        name: 'Emergency Roadside Kit',
        category: 'Safety',
        price: 44.99,
        stock: 18,
        description: 'Complete roadside emergency kit with jumper cables, flashlight, and tools.',
        compatibility: 'Universal',
        image: null
    }
];

// Services Data
const servicesData = [
    {
        id: 'oil-change',
        name: 'Oil Change & Maintenance',
        price: 'Starting at $39.99',
        duration: '30 minutes',
        description: 'Regular oil changes are essential for engine longevity. We use premium oils and filters.',
        includes: [
            'Oil drain and refill (up to 5 quarts)',
            'Premium oil filter',
            'Multi-point inspection',
            'Fluid level check',
            'Tire pressure check'
        ]
    },
    {
        id: 'brakes',
        name: 'Brake Service',
        price: 'Starting at $199.99',
        duration: '1-2 hours',
        description: 'Complete brake service including inspection, pad replacement, and rotor resurfacing.',
        includes: [
            'Brake pad replacement',
            'Rotor inspection and resurfacing',
            'Brake fluid check',
            'Caliper inspection',
            'Test drive and verification'
        ]
    },
    {
        id: 'diagnostics',
        name: 'Engine Diagnostics',
        price: 'Starting at $89.99',
        duration: '1 hour',
        description: 'Advanced computer diagnostics to identify engine issues quickly and accurately.',
        includes: [
            'Computer diagnostic scan',
            'Error code reading and interpretation',
            'Visual engine inspection',
            'Detailed diagnostic report',
            'Repair recommendations'
        ]
    },
    {
        id: 'tires',
        name: 'Tire Services',
        price: 'Starting at $19.99',
        duration: '30-60 minutes',
        description: 'Complete tire services including sales, installation, rotation, and balancing.',
        includes: [
            'Tire rotation',
            'Balance and alignment check',
            'Pressure adjustment',
            'Tread depth inspection',
            'Tire condition assessment'
        ]
    },
    {
        id: 'ac-heating',
        name: 'AC & Heating Service',
        price: 'Starting at $129.99',
        duration: '1-2 hours',
        description: 'Keep your cabin comfortable with AC recharge and heating system repairs.',
        includes: [
            'AC system inspection',
            'Refrigerant recharge',
            'Heating system check',
            'Blower motor inspection',
            'Performance test'
        ]
    },
    {
        id: 'inspection',
        name: 'State Inspection',
        price: '$35.00',
        duration: '45 minutes',
        description: 'Official Massachusetts state inspection to ensure your vehicle meets safety standards.',
        includes: [
            'Complete safety inspection',
            'Emissions testing',
            'Brake system check',
            'Light and signal inspection',
            'State certification'
        ]
    }
];

// Load vehicles from admin upload system (if any)
function loadVehiclesFromAdmin() {
    const adminVehicles = localStorage.getItem('zamzam_vehicles');
    if (adminVehicles) {
        try {
            return JSON.parse(adminVehicles);
        } catch (e) {
            console.error('Error loading admin vehicles:', e);
            return [];
        }
    }
    return [];
}

// Merge default vehicles with admin-uploaded vehicles
const adminVehicles = loadVehiclesFromAdmin();
const mergedCarsData = [...carsData, ...adminVehicles];

// Make data globally available
window.carsData = mergedCarsData;
window.partsData = partsData;
window.servicesData = servicesData;
