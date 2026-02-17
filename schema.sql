DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  price REAL,
  image TEXT
);

INSERT INTO products (title, description, price, image) VALUES ('Nobero Oversized Hoodies for Man Stylish', 'Cozy oversized hoodie.', 1500, 'static/images/prod1.png');
INSERT INTO products (title, description, price, image) VALUES ('SHODOX Mens Solid Dotted Unique Design Oversized Tshirt', 'Soft cotton t-shirt.', 369, 'static/images/prod2.png');
INSERT INTO products (title, description, price, image) VALUES ('GRECIILOOKS Men’S Denim Jacket', 'Lightweight everyday jacket.', 2999, 'static/images/prod3.png');
INSERT INTO products (title, description, price, image) VALUES ('Ben Martin Women’s High Waist Jeans', 'Flared Bell Bottom.', 899, 'static/images/prod4.png');
INSERT INTO products (title, description, price, image) VALUES ('2 in 1 Active Dual Shorts with Inner Tights Layer', 'Casual summer shorts.', 474, 'static/images/prod5.png');
INSERT INTO products (title, description, price, image) VALUES ('Onitsuka Tiger', 'MEXICO 66.', 12500, 'static/images/prod6.png');
INSERT INTO products (title, description, price, image) VALUES ('Solid Color V-Neck Bow Tie Waist Dress', 'Chocolate Brown.', 999, 'static/images/prod7.png');
INSERT INTO products (title, description, price, image) VALUES ('Jungle Book: Indie Print', 'Holiday Shirts.', 1199, 'static/images/prod8.png');
INSERT INTO products (title, description, price, image) VALUES ('Veirdo Polycotton Spun Oversized Fit Drop Shoulder Hooded Sweatshirt', 'Cozy oversized Sweatshirt.', 749, 'static/images/prod9.png');
INSERT INTO products (title, description, price, image) VALUES ('LEOTUDE Men Half Sleeve Round Neck Graphic Font Printed', 'Soft cotton t-shirt.', 589, 'static/images/prod10.png');
INSERT INTO products (title, description, price, image) VALUES ('JACK & JONES Men''s Polyester Standard Length Coat', 'Coat.', 7507, 'static/images/prod11.png');
INSERT INTO products (title, description, price, image) VALUES ('Ben Martin Men’s Bell Bottom Jeans', 'Bootcut Denim Pants.', 999, 'static/images/prod12.png');
INSERT INTO products (title, description, price, image) VALUES ('Men’s Slim Fit Knitted Short for Summer | Stretchable Fabric', 'Casual summer shorts.', 299, 'static/images/prod13.png');
INSERT INTO products (title, description, price, image) VALUES ('Puma Mens Speedcat Og Sneaker', 'Speedcat.', 9999, 'static/images/prod14.png');
INSERT INTO products (title, description, price, image) VALUES ('Biba Navy Poly Cotton Flared Printed Dress', 'Casual day dress.', 3595, 'static/images/prod15.png');
INSERT INTO products (title, description, price, image) VALUES ('Rare Rabbit REGULAR FIT CHECKED PRINT SHIRT', 'PASTEL PINK.', 4399, 'static/images/prod16.png');
INSERT INTO products (title, description, price, image) VALUES ('Bewakoof Women''s Cotton Hooded Sweatshirt', 'Cozy oversized hoodie.', 1099, 'static/images/prod17.png');
INSERT INTO products (title, description, price, image) VALUES ('Veirdo® Pure Cotton Oversized Baggy Fit Drop Shoulder Stylish', 'Baggy t-shirt.', 888, 'static/images/prod18.png');
INSERT INTO products (title, description, price, image) VALUES ('Blaq Ash Men''s Faux Leather Hooded Motorcycle Jacket', 'Lightweight Motorcycle jacket.', 2195, 'static/images/prod19.png');
INSERT INTO products (title, description, price, image) VALUES ('JVX Jeans for Men', 'Slim fit denim jeans.', 749, 'static/images/prod20.png');
INSERT INTO products (title, description, price, image) VALUES ('Jockey Women''s High Coverage Elastane Stretch Mid Waist Shorties', 'Shorties.', 349, 'static/images/prod21.png');
INSERT INTO products (title, description, price, image) VALUES ('Puma Unisex Adult Ferrari Carbon Cat Mid Sneaker', 'Comfortable everyday sneakers.', 3599, 'static/images/prod22.png');
INSERT INTO products (title, description, price, image) VALUES ('Cherry Ruched Square Neck Ruffle', 'High-Low Midi Dress.', 1299, 'static/images/prod23.png');
INSERT INTO products (title, description, price, image) VALUES ('Pepe Jeans Yellow Single Pocket Long Sleeve Shirt', 'Button-up casual shirt.', 1999, 'static/images/prod24.png');
INSERT INTO products (title, description, price, image) VALUES ('ADRO Mens Hoodies with Hail The Dragon Puff Backside Printed', 'Cozy oversized hoodie.', 999, 'static/images/prod25.png');
INSERT INTO products (title, description, price, image) VALUES ('The Souled Store Official Top Gun', 'Soft cotton t-shirt.', 546, 'static/images/prod26.png');
INSERT INTO products (title, description, price, image) VALUES ('F1 Racing Jacket Graphic Printed', 'Lightweight everyday jacket.', 1899, 'static/images/prod27.png');
INSERT INTO products (title, description, price, image) VALUES ('Dockstreet Men Baggy Denim Jeans', 'Slim fit denim jeans.', 499, 'static/images/prod28.png');
INSERT INTO products (title, description, price, image) VALUES ('U.S. POLO ASSN. Men''s Cotton Boxers', 'Casual summer shorts.', 503, 'static/images/prod29.png');
INSERT INTO products (title, description, price, image) VALUES ('Lotto Men Mavin Classic Sneakers', 'Comfortable sneakers.', 1999, 'static/images/prod30.png');
INSERT INTO products (title, description, price, image) VALUES ('Bright Mosaic Print A-Line Mini Dress', 'Casual day dress.', 899, 'static/images/prod31.png');
INSERT INTO products (title, description, price, image) VALUES ('Zara CHECK OVERSHIRT WITH CONTRAST', 'Hoodie.', 2999, 'static/images/prod32.png');
INSERT INTO products (title, description, price, image) VALUES ('Black Men Hooded Sweatshirt', 'Cozy oversized hoodie.', 699, 'static/images/prod33.png');
INSERT INTO products (title, description, price, image) VALUES ('GRECIILOOKS Polo T-Shirt for Men', 'Soft cotton t-shirt.', 799, 'static/images/prod34.png');
INSERT INTO products (title, description, price, image) VALUES ('JACK & JONES Men''s Cotton Blend Coat', 'Coat.', 3307, 'static/images/prod35.png');
INSERT INTO products (title, description, price, image) VALUES ('London Hills Women''s Relaxed Fit High Rise Jeans', 'Relaxed fit jeans.', 699, 'static/images/prod36.png');
INSERT INTO products (title, description, price, image) VALUES ('PROSHARX Men’s Shorts Quick Dry', 'Casual summer shorts.', 399, 'static/images/prod37.png');
INSERT INTO products (title, description, price, image) VALUES ('U.S. Polo Assn. Womens Simone 3.0 Sneaker', 'Everyday sneakers.', 2442, 'static/images/prod38.png');
INSERT INTO products (title, description, price, image) VALUES ('NYE Blazer Mini Dress in Redberry', 'Casual day dress.', 1499, 'static/images/prod39.png');
INSERT INTO products (title, description, price, image) VALUES ('Bluorng BIRD OF PARADISE FULL SLEEVE SHIRT', 'Casual shirt.', 7200, 'static/images/prod40.png');
