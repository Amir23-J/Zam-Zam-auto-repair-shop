// Simple Vehicle Upload Manager
// No complex file uploads - just filenames!

class SimpleVehicleManager {
    constructor() {
        this.imageFilenames = [];
        this.features = [];
        this.vehicles = this.loadVehicles();
        this.init();
    }

    init() {
        this.setupImageInput();
        this.setupFeatures();
        this.setupForm();
        this.displayInventory();
    }

    // ===== IMAGE FILENAME MANAGEMENT =====
    setupImageInput() {
        const addImageBtn = document.getElementById('addImageBtn');
        const imageInput = document.getElementById('imageFilename');

        addImageBtn.addEventListener('click', () => {
            this.addImageFilename();
        });

        imageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addImageFilename();
            }
        });
    }

    addImageFilename() {
        const input = document.getElementById('imageFilename');
        const filename = input.value.trim();

        if (filename && !this.imageFilenames.includes(filename)) {
            this.imageFilenames.push(filename);
            this.displayImageList();
            input.value = '';
        }
    }

    removeImageFilename(filename) {
        this.imageFilenames = this.imageFilenames.filter(f => f !== filename);
        this.displayImageList();
    }

    displayImageList() {
        const imageList = document.getElementById('imageList');

        if (this.imageFilenames.length === 0) {
            imageList.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 20px;">No photos added yet</p>';
            return;
        }

        imageList.innerHTML = this.imageFilenames.map(filename => `
            <div class="image-item">
                <span><i class="fas fa-image"></i> ${filename}</span>
                <button type="button" class="remove-btn" onclick="vehicleManager.removeImageFilename('${filename}')">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        `).join('');
    }

    // ===== FEATURES MANAGEMENT =====
    setupFeatures() {
        const addFeatureBtn = document.getElementById('addFeatureBtn');
        const featureInput = document.getElementById('featureInput');

        addFeatureBtn.addEventListener('click', () => {
            this.addFeature();
        });

        featureInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addFeature();
            }
        });
    }

    addFeature() {
        const input = document.getElementById('featureInput');
        const feature = input.value.trim();

        if (feature && !this.features.includes(feature)) {
            this.features.push(feature);
            this.displayFeatures();
            input.value = '';
        }
    }

    removeFeature(feature) {
        this.features = this.features.filter(f => f !== feature);
        this.displayFeatures();
    }

    displayFeatures() {
        const featureTags = document.getElementById('featureTags');

        if (this.features.length === 0) {
            featureTags.innerHTML = '';
            return;
        }

        featureTags.innerHTML = this.features.map(feature => `
            <div class="feature-tag">
                <span>${feature}</span>
                <button type="button" onclick="vehicleManager.removeFeature('${feature.replace(/'/g, "\\'")}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // ===== FORM MANAGEMENT =====
    setupForm() {
        const form = document.getElementById('vehicleForm');
        const clearBtn = document.getElementById('clearBtn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVehicle();
        });

        clearBtn.addEventListener('click', () => {
            this.clearForm();
        });
    }

    addVehicle() {
        // Collect form data
        const vehicleData = {
            id: Date.now(),
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: parseInt(document.getElementById('year').value),
            price: parseFloat(document.getElementById('price').value),
            mileage: parseInt(document.getElementById('mileage').value),
            transmission: document.getElementById('transmission').value,
            fuelType: document.getElementById('fuelType').value,
            color: document.getElementById('color').value,
            condition: document.getElementById('condition').value,
            description: document.getElementById('description').value,
            features: [...this.features],
            imageFilenames: [...this.imageFilenames]
        };

        // Add to vehicles array
        this.vehicles.push(vehicleData);

        // Save to localStorage
        this.saveVehicles();

        // Show success message
        this.showSuccess();

        // Clear form
        this.clearForm();

        // Update display
        this.displayInventory();
    }

    deleteVehicle(id) {
        if (confirm('Are you sure you want to delete this vehicle from your inventory?')) {
            this.vehicles = this.vehicles.filter(v => v.id !== id);
            this.saveVehicles();
            this.displayInventory();
        }
    }

    clearForm() {
        document.getElementById('vehicleForm').reset();
        this.imageFilenames = [];
        this.features = [];
        this.displayImageList();
        this.displayFeatures();
    }

    showSuccess() {
        const banner = document.getElementById('successBanner');
        banner.classList.add('show');

        setTimeout(() => {
            banner.classList.remove('show');
        }, 4000);

        // Scroll to success message
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ===== INVENTORY DISPLAY =====
    displayInventory() {
        const container = document.getElementById('inventoryList');
        const count = document.getElementById('inventoryCount');

        count.textContent = this.vehicles.length;

        if (this.vehicles.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #9ca3af;">
                    <i class="fas fa-inbox" style="font-size: 3em; margin-bottom: 15px; display: block;"></i>
                    <p>No vehicles in inventory yet. Add your first one above!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.vehicles.map(vehicle => `
            <div class="inventory-item">
                <div class="inventory-item-info">
                    <h4>${vehicle.year} ${vehicle.make} ${vehicle.model}</h4>
                    <p>
                        $${vehicle.price.toLocaleString()} •
                        ${vehicle.mileage.toLocaleString()} miles •
                        ${vehicle.color} •
                        ${vehicle.transmission}
                        ${vehicle.imageFilenames && vehicle.imageFilenames.length > 0
                            ? ` • ${vehicle.imageFilenames.length} photo${vehicle.imageFilenames.length !== 1 ? 's' : ''}`
                            : ''}
                    </p>
                </div>
                <button class="delete-btn" onclick="vehicleManager.deleteVehicle(${vehicle.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }

    // ===== DATA PERSISTENCE =====
    loadVehicles() {
        const stored = localStorage.getItem('zamzam_vehicles');
        return stored ? JSON.parse(stored) : [];
    }

    saveVehicles() {
        localStorage.setItem('zamzam_vehicles', JSON.stringify(this.vehicles));
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.vehicleManager = new SimpleVehicleManager();
});
