CREATE TABLE product_order (id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id));