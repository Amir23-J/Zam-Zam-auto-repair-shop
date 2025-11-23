# 💳 PAYMENT OPTIONS - QUICK START GUIDE

## ⚡ 5-Minute Setup

### Where to Make Changes
**Open this file:** `js/config.js`

All payment settings are in ONE place! No coding knowledge needed.

---

## 🔧 How to Turn Payments ON/OFF

### Master Switch (Line 62)

```javascript
payments: {
    enabled: false,  // ← CHANGE TO true
```

**Change `false` to `true`** to enable payment system.

---

## 💰 Individual Payment Options

### Option 1: Credit Cards (Stripe) ✨ Most Popular

**Pros:** Customers love it, very secure, industry standard
**Cons:** Requires account setup (15 minutes)
**Cost:** 2.9% + 30¢ per transaction

```javascript
stripe: {
    enabled: true,  // ← Turn ON here
    publishableKey: "pk_test_YOUR_KEY",  // Get from Stripe
    secretKey: "sk_test_YOUR_KEY",       // Keep secret!
}
```

**Setup:** https://dashboard.stripe.com/register

---

### Option 2: PayPal 🅿️

**Pros:** Customers trust PayPal, easy setup
**Cons:** Slightly higher fees
**Cost:** 2.9% + 30¢ per transaction

```javascript
paypal: {
    enabled: true,  // ← Turn ON here
    clientId: "YOUR_CLIENT_ID",  // Get from PayPal
}
```

**Setup:** https://developer.paypal.com/

---

### Option 3: Square 🟦

**Pros:** Great if you already use Square for in-person sales
**Cons:** Requires Square account
**Cost:** 2.9% + 30¢ per transaction

```javascript
square: {
    enabled: true,  // ← Turn ON here
    applicationId: "YOUR_APP_ID",
    locationId: "YOUR_LOCATION_ID",
}
```

**Setup:** https://developer.squareup.com/

---

### Option 4: Pay at Shop 🏪 SAFEST

**Pros:** No fees, no risk, customers pick up in person
**Cons:** Customer must visit your shop
**Cost:** FREE

```javascript
cashOnPickup: {
    enabled: true,  // ← Already ON by default!
}
```

**No setup needed!** ✅

---

### Option 5: Call to Order ☎️ SAFEST

**Pros:** No fees, you control payment, talk to customer first
**Cons:** Manual process
**Cost:** FREE

```javascript
phoneOrder: {
    enabled: true,  // ← Already ON by default!
}
```

**No setup needed!** ✅

---

## 🎯 RECOMMENDED SETUP

### For Beginners (Safe Start)

```javascript
payments: {
    enabled: true,  // Turn payment system ON

    stripe: { enabled: false },         // Not yet
    paypal: { enabled: false },         // Not yet
    square: { enabled: false },         // Not yet
    cashOnPickup: { enabled: true },    // ✓ YES
    phoneOrder: { enabled: true }       // ✓ YES
}
```

**Result:** Customers can:
- Browse your parts
- Add to cart
- Submit order
- Pick up at shop OR call you to pay

**You get:**
- No transaction fees
- Talk to customer before payment
- Zero financial risk
- Time to learn the system

---

### When You're Ready for Online Payments

```javascript
payments: {
    enabled: true,

    stripe: { enabled: true },          // ✓ Add Stripe
    paypal: { enabled: false },         // Optional
    square: { enabled: false },         // Optional
    cashOnPickup: { enabled: true },    // ✓ Keep this
    phoneOrder: { enabled: true }       // ✓ Keep this
}
```

**Result:** Customers can choose:
1. Pay with credit card (Stripe)
2. Pick up and pay at shop
3. Call to complete order

**Best of both worlds!**

---

## 🎨 Matching Your Sign Colors

### Super Easy - 3 Steps

1. Take a photo of your business sign
2. Go to: https://imagecolorpicker.com/
3. Upload photo, click on your main color
4. Copy the code (example: #FF0000)
5. Paste in `config.js`:

```javascript
theme: {
    primaryColor: "#FF0000",  // ← Your main sign color
    secondaryColor: "#0000FF", // ← Your accent color
}
```

**The website colors change automatically!** ✨

### Popular Auto Shop Color Schemes

**Red & Black (Classic)**
```javascript
primaryColor: "#d32f2f",    // Red
secondaryColor: "#212121",   // Black
```

**Blue & Orange (Modern)**
```javascript
primaryColor: "#1976d2",    // Blue
secondaryColor: "#f57c00",   // Orange
```

**Green & Gray (Eco-Friendly)**
```javascript
primaryColor: "#2e7d32",    // Green
secondaryColor: "#616161",   // Gray
```

---

## ✅ Testing Checklist

Before going live:

### Test Payments OFF
- [ ] Set `enabled: false`
- [ ] Try to checkout - should show contact message
- [ ] Perfect for initial setup

### Test Safe Payments Only
- [ ] Set `enabled: true`
- [ ] Only `cashOnPickup` and `phoneOrder` enabled
- [ ] Add item to cart
- [ ] Go through checkout
- [ ] See pickup/phone options

### Test Online Payments
- [ ] Enable Stripe with TEST keys (`pk_test_...`)
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Complete test purchase
- [ ] Check if order goes through

---

## 🆘 Quick Troubleshooting

### "I enabled payments but nothing shows"

**Check:**
1. Is `payments.enabled: true`?
2. Is at least ONE payment method enabled?
3. Did you save the `config.js` file?
4. Did you refresh your browser? (Ctrl+Shift+R)

### "Colors aren't changing"

**Fix:**
1. Make sure you saved `config.js`
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check that `config.js` loads first in HTML files

### "Stripe/PayPal not working"

**Check:**
1. Did you add your API keys?
2. Are you in TEST mode? (Use test keys)
3. Check browser console (F12) for errors

---

## 📞 Need Help?

**For this file:**
Read the full `SETUP-GUIDE.md`

**For payment processors:**
- Stripe Support: https://support.stripe.com/
- PayPal Support: https://www.paypal.com/us/smarthelp/
- Square Support: https://squareup.com/help/

---

## 🎓 Payment Processing 101

### Transaction Fees Explained

**All online processors charge similar rates:**
- 2.9% + 30¢ per transaction (industry standard)

**Example:**
- Customer buys $100 in parts
- You receive: $97.20
- Fee: $2.80 (2.9%) + $0.30 = $3.10

**In-person payments (Square reader):**
- Usually cheaper: 2.6% + 10¢

**Free methods (Phone/Pickup):**
- $0 fees!
- You handle payment yourself

### Security Features (Built-In)

✅ SSL encryption (when you deploy with HTTPS)
✅ PCI compliance (handled by Stripe/PayPal/Square)
✅ No credit card numbers stored on your server
✅ Customer data protected

**You don't need to worry about security!**
The payment processors handle everything.

---

## 🚀 Ready to Launch!

**Safe Launch Plan:**

**Week 1:**
- Enable payments
- Use only Phone/Pickup options
- Get comfortable with orders

**Week 2:**
- Set up Stripe TEST account
- Practice with test cards
- Learn the system

**Week 3:**
- Go LIVE with Stripe
- Start accepting real cards
- Monitor transactions

**Week 4:**
- Add PayPal if desired
- Consider other options
- Optimize based on customer feedback

---

**You've got this!** 💪

The payment system is designed to grow with you. Start simple, add features as you're ready.

All settings in ONE file (`config.js`) - change anytime! 🎉
