// Ultra-Simple Vehicle Upload Manager
// Designed to be incredibly easy for non-technical users

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
        this.setupRealTimePreview();
        this.displayInventory();
    }

    // ===== REAL-TIME PREVIEW =====
    setupRealTimePreview() {
        // Update preview whenever user types
        const inputs = ['make', 'model', 'year', 'price', 'mileage', 'color', 'transmission', 'fuelType', 'condition', 'description'];

        inputs.forEach(id => {
            const element = document.getElementById(id);
            element.addEventListener('input', () => this.updatePreview());
            element.addEventListener('change', () => this.updatePreview());
        });
    }

    updatePreview() {
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const price = document.getElementById('price').value;
        const mileage = document.getElementById('mileage').value;
        const color = document.getElementById('color').value;
        const transmission = document.getElementById('transmission').value;
        const fuelType = document.getElementById('fuelType').value;
        const condition = document.getElementById('condition').value;
        const description = document.getElementById('description').value;

        // Show preview if at least make and model are filled
        if (!make && !model) {
            document.getElementById('previewSection').classList.remove('show');
            return;
        }

        document.getElementById('previewSection').classList.add('show');

        const previewCard = document.getElementById('previewCard');
        previewCard.innerHTML = `
            <div class="preview-vehicle-title">
                ${year || '[Year]'} ${make || '[Make]'} ${model || '[Model]'}
            </div>

            <div class="preview-details">
                ${price ? `
                    <div class="preview-detail">
                        <i class="fas fa-dollar-sign"></i>
                        <strong>$${parseFloat(price).toLocaleString()}</strong>
                    </div>
                ` : ''}

                ${mileage ? `
                    <div class="preview-detail">
                        <i class="fas fa-tachometer-alt"></i>
                        ${parseInt(mileage).toLocaleString()} miles
                    </div>
                ` : ''}

                ${color ? `
                    <div class="preview-detail">
                        <i class="fas fa-palette"></i>
                        ${color}
                    </div>
                ` : ''}

                ${transmission ? `
                    <div class="preview-detail">
                        <i class="fas fa-cog"></i>
                        ${transmission}
                    </div>
                ` : ''}

                ${fuelType ? `
                    <div class="preview-detail">
                        <i class="fas fa-gas-pump"></i>
                        ${fuelType}
                    </div>
                ` : ''}

                ${condition ? `
                    <div class="preview-detail">
                        <i class="fas fa-star"></i>
                        ${condition}
                    </div>
                ` : ''}
            </div>

            ${description ? `
                <div style="margin-top: 15px; padding: 15px; background: #f9fafb; border-radius: 8px;">
                    <strong style="color: #374151;">Description:</strong>
                    <p style="margin-top: 8px; color: #6b7280; line-height: 1.6;">${description}</p>
                </div>
            ` : ''}

            ${this.features.length > 0 ? `
                <div style="margin-top: 15px;">
                    <strong style="color: #374151;">Features:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                        ${this.features.map(f => `
                            <span style="background: #dbeafe; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 0.9em;">
                                <i class="fas fa-check-circle"></i> ${f}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${this.imageFilenames.length > 0 ? `
                <div style="margin-top: 15px; color: #10b981;">
                    <i class="fas fa-images"></i> <strong>${this.imageFilenames.length} photo${this.imageFilenames.length !== 1 ? 's' : ''} added</strong>
                </div>
            ` : ''}
        `;

        // Scroll preview into view smoothly
        setTimeout(() => {
            document.getElementById('previewSection').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
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
            this.displayPhotoList();
            this.updatePreview();
            input.value = '';
            input.focus(); // Keep focus for easy multiple additions
        }
    }

    removeImageFilename(filename) {
        this.imageFilenames = this.imageFilenames.filter(f => f !== filename);
        this.displayPhotoList();
        this.updatePreview();
    }

    displayPhotoList() {
        const container = document.getElementById('photoListContainer');
        const photoList = document.getElementById('photoList');

        if (this.imageFilenames.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        photoList.innerHTML = this.imageFilenames.map(filename => `
            <div class="photo-item">
                <span><i class="fas fa-image" style="color: #3b82f6;"></i> ${filename}</span>
                <button type="button" class="remove-btn" onclick="vehicleManager.removeImageFilename('${filename.replace(/'/g, "\\'")}')">
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
            this.updatePreview();
            input.value = '';
            input.focus(); // Keep focus for easy multiple additions
        }
    }

    removeFeature(feature) {
        this.features = this.features.filter(f => f !== feature);
        this.displayFeatures();
        this.updatePreview();
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
            if (confirm('Are you sure you want to clear the form and start over?')) {
                this.clearForm();
            }
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
            features: this.features.length > 0 ? [...this.features] : [],
            imageFilenames: this.imageFilenames.length > 0 ? [...this.imageFilenames] : []
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

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    deleteVehicle(id) {
        if (confirm('Are you sure you want to delete this vehicle from your inventory?')) {
            this.vehicles = this.vehicles.filter(v => v.id !== id);
            this.saveVehicles();
            this.displayInventory();
            this.showSuccess('Vehicle deleted successfully!');
        }
    }

    clearForm() {
        document.getElementById('vehicleForm').reset();
        this.imageFilenames = [];
        this.features = [];
        this.displayPhotoList();
        this.displayFeatures();
        document.getElementById('previewSection').classList.remove('show');
    }

    showSuccess(message = 'Success! Your vehicle is now live on the website!') {
        const banner = document.getElementById('successBanner');
        banner.querySelector('span').textContent = message;
        banner.classList.add('show');

        setTimeout(() => {
            banner.classList.remove('show');
        }, 5000);

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
                <div style="text-align: center; padding: 60px 20px; color: #9ca3af; background: #f9fafb; border-radius: 12px;">
                    <i class="fas fa-inbox" style="font-size: 4em; margin-bottom: 20px; display: block; opacity: 0.5;"></i>
                    <p style="font-size: 1.2em;">No vehicles in inventory yet.</p>
                    <p style="margin-top: 10px;">Fill out the form above to add your first vehicle!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.vehicles.map(vehicle => `
            <div class="inventory-item">
                <div class="inventory-info">
                    <h4>${vehicle.year} ${vehicle.make} ${vehicle.model}</h4>
                    <p>
                        <strong style="color: #10b981; font-size: 1.1em;">$${vehicle.price.toLocaleString()}</strong>
                        • ${vehicle.mileage.toLocaleString()} miles
                        • ${vehicle.color}
                        • ${vehicle.transmission}
                        ${vehicle.imageFilenames && vehicle.imageFilenames.length > 0
                            ? ` • <span style="color: #10b981;"><i class="fas fa-images"></i> ${vehicle.imageFilenames.length} photo${vehicle.imageFilenames.length !== 1 ? 's' : ''}</span>`
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
