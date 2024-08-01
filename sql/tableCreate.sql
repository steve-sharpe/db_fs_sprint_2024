-- Create the database
CREATE DATABASE game_store
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE USERS (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    street_address VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(6) NOT NULL,
    prov VARCHAR(2) NOT NULL,
    phone_number VARCHAR(10) NOT NULL
);

CREATE TABLE CATEGORIES (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

CREATE TABLE GAMES (
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    publisher VARCHAR(50),
    release_year INT,
    price DECIMAL(10, 2),
    category_id INT REFERENCES CATEGORIES(category_id),
    stock_quantity INT
);

CREATE TABLE ORDERS (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES USERS(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50)
);

CREATE TABLE ORDER_ITEMS (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES ORDERS(order_id),
    game_id INT REFERENCES GAMES(game_id),
    quantity INT,
    price DECIMAL(10, 2)
);

CREATE TABLE PAYMENTS (
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES ORDERS(order_id),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50)
);

CREATE TABLE SHIPPING (
    shipping_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES ORDERS(order_id),
    user_id INT REFERENCES USERS(user_id),
    shipping_date TIMESTAMP,
    status VARCHAR(50)
);