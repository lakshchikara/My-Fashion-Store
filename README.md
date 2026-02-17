# Fashion Store Demo (Flask) – Updated Version

Features:
- Flask + SQLite backend
- 40 products with sample images
- Home page:
  - Hero section (yellow/white design)
  - New Arrivals: 10 products (5 x 2 grid)
  - Unique mood-based outfit picker
- Products page:
  - 40-product grid (5 per row)
  - Sort by price (Low → High / High → Low)
  - Integrated search from navbar
- Auth:
  - Sign in / Sign up slider page
  - Passwords stored hashed
- Cart:
  - Add to cart with bounce animation on cart icon
  - Cart popup (no extra page)
  - Increase / Decrease quantity in cart
  - Total updates automatically
- Payments:
  - Card / UPI / COD options
  - Logos displayed for payment
  - COD shows "Order placed" animation overlay

## Run

Before Running make sure your Python version is 3.11 or 3.12. This doesn't support 3.14.2 and to select this version use:

1️⃣ Go to your project folder
cd F:\Projects\Fashion-Store

2️⃣ Create virtual environment using Python 3.11

Very important:

py -3.11 -m venv venv

3️⃣ Activate it
venv\Scripts\activate


You should see:

(venv) F:\Projects\Fashion-Store>

4️⃣ Upgrade pip
python -m pip install --upgrade pip

5️⃣ Install requirements
pip install -r requirements.txt


Now Pillow will install properly because Python 3.11 is supported.

6️⃣ Run your site
python app.py

7. Open `http://127.0.0.1:5000` in your browser.
