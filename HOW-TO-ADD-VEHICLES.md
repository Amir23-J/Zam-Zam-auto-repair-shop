# How to Add Vehicles to Your Website

## Super Simple 3-Step Process

### Step 1: Save Your Photos

1. Take photos of your vehicle with your phone or camera
2. Transfer them to your computer
3. Save them in the `images/inventory/` folder
4. Name them something simple like:
   - `honda-accord-1.jpg`
   - `toyota-camry-front.jpg`
   - `ford-truck-interior.jpg`

**Tip:** Use simple names with no spaces - use dashes (-) instead

---

### Step 2: Open the Upload Page

1. Open `admin.html` in your web browser
2. You'll see a simple form to fill out

---

### Step 3: Fill Out the Form

1. **Add Photos:**
   - Type the filename of each photo (example: `honda-accord-1.jpg`)
   - Click "Add Photo"
   - Repeat for each photo

2. **Fill in Vehicle Details:**
   - Make (Toyota, Honda, etc.)
   - Model (Camry, Accord, etc.)
   - Year
   - Price (just the number, no $ sign)
   - Mileage
   - Color
   - Transmission (select from dropdown)
   - Fuel Type (select from dropdown)
   - Condition (select from dropdown)
   - Description (optional - tell customers about the vehicle)

3. **Add Features** (optional):
   - Type a feature (like "Backup Camera")
   - Click "Add"
   - Repeat for each feature

4. **Click "Add Vehicle"**

That's it! Your vehicle now appears on your website automatically!

---

## Where is Everything Stored?

- **Photos:** Saved in `images/inventory/` folder
- **Vehicle Details:** Saved automatically in your browser (uses localStorage)
- The website reads this data automatically and displays your vehicles

---

## Common Questions

**Q: What if I make a mistake?**
A: Just delete the vehicle from the inventory list at the bottom of admin.html and add it again.

**Q: What photo formats can I use?**
A: JPG, JPEG, PNG - whatever your camera produces is fine!

**Q: How many photos can I add per vehicle?**
A: As many as you want! Just add each filename one at a time.

**Q: Do I need to know coding?**
A: Nope! Just fill out the form like you would any online form.

---

## Need Help?

If something isn't working:
1. Make sure your photo files are actually in the `images/inventory/` folder
2. Make sure the filename you typed matches exactly (including .jpg or .png)
3. Make sure you filled in all the required fields (marked with *)

---

**That's it! Adding vehicles is as simple as filling out a form.**
