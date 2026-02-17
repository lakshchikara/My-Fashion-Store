from flask import Flask, render_template, request, redirect, url_for, session, jsonify, g
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from pathlib import Path

# -------------------------------------------------
# Paths & setup
# -------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "instance" / "app.db"
SCHEMA_FILE = BASE_DIR / "schema.sql"

app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = "change-this-secret-key"  # Change this before submission


# -------------------------------------------------
# Database helpers
# -------------------------------------------------
def get_db():
    """Open SQLite connection for current request."""
    db = getattr(g, "_database", None)
    if db is None:
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        db = g._database = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db


def init_db():
    """Initialize database from schema.sql"""
    db = get_db()
    with open(SCHEMA_FILE, "r", encoding="utf-8") as f:
        db.executescript(f.read())
    db.commit()


# -------------------------------------------------
# Flask 3 FIX — manually initialize DB BEFORE server starts
# -------------------------------------------------
with app.app_context():
    if not DB_PATH.exists():
        init_db()


@app.teardown_appcontext
def close_connection(exception):
    """Close DB connection after request ends."""
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


# -------------------------------------------------
# Routes: Pages
# -------------------------------------------------
@app.route("/")
def index():
    db = get_db()
    # First 10 products for New Arrivals
    products = db.execute("SELECT * FROM products ORDER BY id LIMIT 10").fetchall()
    return render_template("index.html", products=products, email=session.get("email"))


@app.route("/products")
def products_page():
    db = get_db()
    products = db.execute("SELECT * FROM products ORDER BY id").fetchall()
    return render_template("products.html", products=products, email=session.get("email"))


@app.route("/auth")
def auth():
    return render_template("auth.html", signup_error=None, login_error=None)


# -------------------------------------------------
# Authentication
# -------------------------------------------------
@app.route("/signup", methods=["POST"])
def signup():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")

    if not email or not password:
        return render_template(
            "auth.html",
            signup_error="Email and password required",
            login_error=None,
        )

    db = get_db()
    existing = db.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
    if existing:
        return render_template(
            "auth.html",
            signup_error="Email already exists",
            login_error=None,
        )

    hashed = generate_password_hash(password)
    db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (name, email, hashed),
    )
    db.commit()

    session["email"] = email
    session["name"] = name

    return redirect(url_for("index"))


@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")

    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

    if not user or not check_password_hash(user["password"], password):
        return render_template(
            "auth.html",
            signup_error=None,
            login_error="Invalid email or password",
        )

    session["email"] = user["email"]
    session["name"] = user["name"]

    return redirect(url_for("index"))


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


# -------------------------------------------------
# Cart API
# -------------------------------------------------
@app.route("/api/cart/add", methods=["POST"])
def api_cart_add():
    data = request.get_json() or {}
    prod_id = str(data.get("id"))

    if not prod_id:
        return jsonify(success=False, message="Missing id"), 400

    cart = session.get("cart", {})
    cart[prod_id] = cart.get(prod_id, 0) + 1
    session["cart"] = cart

    total_items = sum(cart.values())
    return jsonify(success=True, cartCount=total_items)


@app.route("/api/cart/update", methods=["POST"])
def api_cart_update():
    data = request.get_json() or {}
    prod_id = str(data.get("id"))
    delta = int(data.get("delta", 0))

    cart = session.get("cart", {})
    if prod_id not in cart:
        return jsonify(success=False), 400

    new_qty = cart[prod_id] + delta
    if new_qty <= 0:
        cart.pop(prod_id, None)
    else:
        cart[prod_id] = new_qty

    session["cart"] = cart

    total_items = sum(cart.values())
    return jsonify(success=True, cartCount=total_items)


@app.route("/api/cart")
def api_cart():
    db = get_db()
    cart = session.get("cart", {})
    items = []
    total = 0

    for pid, qty in cart.items():
        row = db.execute("SELECT * FROM products WHERE id = ?", (pid,)).fetchone()
        if row:
            price = row["price"]
            total += price * qty
            items.append(
                {
                    "id": row["id"],
                    "title": row["title"],
                    "price": price,
                    "qty": qty,
                    "image": row["image"],
                }
            )

    return jsonify(items=items, total=total)


@app.route("/api/checkout", methods=["POST"])
def api_checkout():
    payment = request.form.get("payment")

    with open(BASE_DIR / "orders.txt", "a") as f:
        f.write(f"User={session.get('email')} | Payment={payment}\n")

    session["cart"] = {}
    return jsonify(success=True, payment=payment)


# -------------------------------------------------
# Search API (optional)
# -------------------------------------------------
@app.route("/api/search")
def api_search():
    q = (request.args.get("q") or "").lower()
    db = get_db()
    rows = db.execute(
        "SELECT * FROM products WHERE lower(title) LIKE ?", (f"%{q}%",)
    ).fetchall()

    return jsonify(
        [
            {
                "id": r["id"],
                "title": r["title"],
                "price": r["price"],
                "image": r["image"],
            }
            for r in rows
        ]
    )


# -------------------------------------------------
# Run the app
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
