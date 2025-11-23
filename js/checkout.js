// Checkout Page Logic with Multi-Payment Support

let currentStep = 1;
let customerInfo = {};
let selectedPaymentMethod = null;
let stripe = null;
let cardElement = null;
let squarePayments = null;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    // Check if cart is empty
    if (cart.items.length === 0) {
        showEmptyCartMessage();
        return;
    }

    // Load cart items in step 1
    renderCheckoutCart();
    updateOrderSummary();

    // Setup form handlers
    setupForms();

    // Initialize payment methods
    initializePaymentMethods();
});

// Show empty cart message
function showEmptyCartMessage() {
    document.getElementById('checkoutContainer').innerHTML = `
        <div class="empty-cart" style="text-align: center; padding: 4rem; background: white; border-radius: 15px;">
            <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
            <h2>Your cart is empty</h2>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Add some parts to your cart before checking out.</p>
            <a href="parts.html" class="btn btn-primary">Shop Parts & Accessories</a>
        </div>
    `;
}

// Render cart items in checkout
function renderCheckoutCart() {
    const container = document.getElementById('checkoutCartItems');
    if (!container) return;

    container.innerHTML = cart.items.map(item => `
        <div class="checkout-cart-item">
            <div class="item-image">
                <i class="fas fa-${item.type === 'car' ? 'car' : 'cog'}"></i>
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="item-price">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Update order summary sidebar
function updateOrderSummary() {
    const subtotal = cart.getTotal();
    const isPickup = document.getElementById('pickupInStore')?.checked || false;
    const shipping = isPickup ? 0 : (subtotal >= CONFIG.payments.shipping.freeShippingOver ? 0 : CONFIG.payments.shipping.flatRate);
    const tax = (subtotal + shipping) * CONFIG.payments.taxRate;
    const total = subtotal + shipping + tax;

    // Summary items
    const summaryItems = document.getElementById('summaryItems');
    if (summaryItems) {
        summaryItems.innerHTML = cart.items.map(item => `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }

    // Update totals
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = isPickup ? 'FREE (Pickup)' : (shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`);
    document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
}

// Navigate between steps
function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show current step
    document.getElementById(`step${step}`).style.display = 'block';

    // Update step indicators
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });

    currentStep = step;
    updateOrderSummary();
}

// Toggle shipping fields based on pickup selection
function toggleShippingFields() {
    const shippingFields = document.getElementById('shippingFields');
    const pickupChecked = document.getElementById('pickupInStore').checked;

    shippingFields.style.display = pickupChecked ? 'none' : 'block';

    // Update required attributes
    const shippingInputs = shippingFields.querySelectorAll('input');
    shippingInputs.forEach(input => {
        input.required = !pickupChecked;
    });

    updateOrderSummary();
}

// Setup form handlers
function setupForms() {
    // Customer info form
    const customerForm = document.getElementById('customerInfoForm');
    if (customerForm) {
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect customer info
            const formData = new FormData(customerForm);
            customerInfo = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                isPickup: document.getElementById('pickupInStore').checked
            };

            if (!customerInfo.isPickup) {
                customerInfo.address = formData.get('address');
                customerInfo.city = formData.get('city');
                customerInfo.state = formData.get('state');
                customerInfo.zip = formData.get('zip');
            }

            goToStep(3);
        });
    }

    // Complete order button
    const completeBtn = document.getElementById('completeOrderBtn');
    if (completeBtn) {
        completeBtn.addEventListener('click', handleCompleteOrder);
    }
}

// Initialize payment methods
function initializePaymentMethods() {
    if (!CONFIG.payments.enabled) {
        // Payments disabled - show alternative checkout
        showNoPaymentMessage();
        return;
    }

    const methods = getEnabledPaymentMethods();
    const container = document.getElementById('paymentMethods');

    if (!container) return;

    container.innerHTML = methods.map(method => `
        <div class="payment-method-card" onclick="selectPaymentMethod('${method.type}')">
            <input type="radio" name="paymentMethod" value="${method.type}" id="payment-${method.type}">
            <label for="payment-${method.type}">
                <div class="payment-icon">
                    <i class="fas fa-${method.icon}"></i>
                </div>
                <div class="payment-details">
                    <h4>${method.displayName}</h4>
                    <p>${method.description}</p>
                </div>
            </label>
        </div>
    `).join('');

    // Initialize payment gateways
    if (CONFIG.payments.stripe.enabled) initializeStripe();
    if (CONFIG.payments.paypal.enabled) initializePayPal();
    if (CONFIG.payments.square.enabled) initializeSquare();
}

// Show message when payments are disabled
function showNoPaymentMessage() {
    const container = document.getElementById('paymentMethods');
    if (container) {
        container.innerHTML = `
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <h3>Contact Us to Complete Your Order</h3>
                <p>Please call us at <strong>${CONFIG.business.phone}</strong> or email <strong>${CONFIG.business.email}</strong> to complete your purchase.</p>
            </div>
        `;
    }

    const completeBtn = document.getElementById('completeOrderBtn');
    if (completeBtn) {
        completeBtn.textContent = 'Send Order Request';
    }
}

// Select payment method
function selectPaymentMethod(type) {
    selectedPaymentMethod = type;

    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
    });

    // Show selected payment form
    const formMap = {
        'stripe': 'stripeForm',
        'paypal': 'paypalForm',
        'square': 'squareForm',
        'cash': 'alternativeForm',
        'phone': 'alternativeForm'
    };

    const formId = formMap[type];
    if (formId) {
        document.getElementById(formId).style.display = 'block';
    }

    // Update alternative payment instructions
    if (type === 'cash' || type === 'phone') {
        const method = CONFIG.payments[type === 'cash' ? 'cashOnPickup' : 'phoneOrder'];
        document.getElementById('alternativeInstructions').textContent = method.instructions;
    }
}

// Initialize Stripe
function initializeStripe() {
    if (typeof Stripe === 'undefined') {
        console.error('Stripe.js not loaded');
        return;
    }

    stripe = Stripe(CONFIG.payments.stripe.publishableKey);
    const elements = stripe.elements();

    cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    });

    cardElement.mount('#card-element');

    // Handle card errors
    cardElement.on('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

// Initialize PayPal
function initializePayPal() {
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded');
        return;
    }

    paypal.Buttons({
        createOrder: function(data, actions) {
            const total = calculateOrderTotal();
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                processOrderComplete('paypal', details.id);
            });
        },
        onError: function(err) {
            console.error('PayPal error:', err);
            alert('Payment failed. Please try again or contact us.');
        }
    }).render('#paypal-button-container');
}

// Initialize Square
async function initializeSquare() {
    if (typeof Square === 'undefined') {
        console.error('Square SDK not loaded');
        return;
    }

    try {
        squarePayments = Square.payments(
            CONFIG.payments.square.applicationId,
            CONFIG.payments.square.locationId
        );

        const card = await squarePayments.card();
        await card.attach('#card-container');
    } catch (error) {
        console.error('Square initialization error:', error);
    }
}

// Calculate order total
function calculateOrderTotal() {
    const subtotal = cart.getTotal();
    const isPickup = customerInfo.isPickup || false;
    const shipping = isPickup ? 0 : (subtotal >= CONFIG.payments.shipping.freeShippingOver ? 0 : CONFIG.payments.shipping.flatRate);
    const tax = (subtotal + shipping) * CONFIG.payments.taxRate;
    return subtotal + shipping + tax;
}

// Handle complete order
async function handleCompleteOrder() {
    if (!selectedPaymentMethod && CONFIG.payments.enabled) {
        alert('Please select a payment method');
        return;
    }

    const completeBtn = document.getElementById('completeOrderBtn');
    completeBtn.disabled = true;
    completeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        switch (selectedPaymentMethod) {
            case 'stripe':
                await processStripePayment();
                break;
            case 'paypal':
                // PayPal handles its own completion
                break;
            case 'square':
                await processSquarePayment();
                break;
            case 'cash':
            case 'phone':
                processAlternativePayment();
                break;
            default:
                processAlternativePayment();
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again or contact us.');
        completeBtn.disabled = false;
        completeBtn.innerHTML = 'Complete Order <i class="fas fa-check"></i>';
    }
}

// Process Stripe payment
async function processStripePayment() {
    const {token, error} = await stripe.createToken(cardElement);

    if (error) {
        document.getElementById('card-errors').textContent = error.message;
        throw error;
    }

    // In production, send token to your server
    console.log('Stripe token:', token);

    // Simulate server processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    processOrderComplete('stripe', token.id);
}

// Process Square payment
async function processSquarePayment() {
    try {
        const result = await squarePayments.tokenize();

        if (result.status === 'OK') {
            console.log('Square token:', result.token);

            // In production, send token to your server
            await new Promise(resolve => setTimeout(resolve, 1500));

            processOrderComplete('square', result.token);
        } else {
            throw new Error(result.errors[0].message);
        }
    } catch (error) {
        document.getElementById('square-errors').textContent = error.message;
        throw error;
    }
}

// Process alternative payment methods
function processAlternativePayment() {
    // These don't require immediate payment processing
    processOrderComplete(selectedPaymentMethod, 'pending');
}

// Process order completion
function processOrderComplete(paymentType, transactionId) {
    const orderData = {
        orderNumber: generateOrderNumber(),
        customer: customerInfo,
        items: cart.items,
        subtotal: cart.getTotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateOrderTotal(),
        paymentMethod: paymentType,
        transactionId: transactionId,
        timestamp: new Date().toISOString()
    };

    console.log('Order completed:', orderData);

    // In production, send order to your server/email
    // sendOrderToServer(orderData);

    // Show confirmation
    showOrderConfirmation(orderData);

    // Clear cart
    cart.items = [];
    cart.saveCart();
    cart.updateCartCount();
}

// Calculate shipping
function calculateShipping() {
    const subtotal = cart.getTotal();
    const isPickup = customerInfo.isPickup || false;
    return isPickup ? 0 : (subtotal >= CONFIG.payments.shipping.freeShippingOver ? 0 : CONFIG.payments.shipping.flatRate);
}

// Calculate tax
function calculateTax() {
    const subtotal = cart.getTotal();
    const shipping = calculateShipping();
    return (subtotal + shipping) * CONFIG.payments.taxRate;
}

// Generate order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ZZ${year}${month}${day}${random}`;
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    goToStep(4);

    const summaryHtml = `
        <div class="order-confirmation-details">
            <div class="confirmation-box">
                <h3>Order #${orderData.orderNumber}</h3>
                <p><strong>Name:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
                <p><strong>Email:</strong> ${orderData.customer.email}</p>
                <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                ${orderData.customer.isPickup ?
                    '<p><strong>Pickup:</strong> In-store pickup at 123 Main Street, Worcester, MA</p>' :
                    `<p><strong>Shipping:</strong> ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zip}</p>`
                }
                <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
                <p><strong>Payment:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
            </div>

            <div class="next-steps">
                <h4>What's Next?</h4>
                <ul>
                    <li><i class="fas fa-check"></i> We've received your order</li>
                    <li><i class="fas fa-envelope"></i> Check your email for confirmation</li>
                    <li><i class="fas fa-phone"></i> We'll contact you within 24 hours</li>
                    ${orderData.customer.isPickup ?
                        '<li><i class="fas fa-store"></i> You\'ll be notified when your order is ready for pickup</li>' :
                        '<li><i class="fas fa-shipping-fast"></i> Your order will be shipped within 1-2 business days</li>'
                    }
                </ul>
            </div>
        </div>
    `;

    document.getElementById('orderSummary').innerHTML = summaryHtml;
}

// Get payment method display name
function getPaymentMethodName(type) {
    const names = {
        'stripe': 'Credit/Debit Card',
        'paypal': 'PayPal',
        'square': 'Square',
        'cash': 'Pay at Pickup',
        'phone': 'Pay by Phone'
    };
    return names[type] || type;
}

// Make functions globally available
window.goToStep = goToStep;
window.toggleShippingFields = toggleShippingFields;
window.selectPaymentMethod = selectPaymentMethod;
