# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
# Index Route: /products [GET]
- Show
# Show Route: /products/:id  [GET]
- Create [token required]
# Create Route: /products [POST]
- [OPTIONAL] Top 5 most popular products 
# Top 5 most popular products Route: /top5products [GET]
- [OPTIONAL] Products by category (args: product category)
# Products by category Route: /products/category/:category [GET]

#### Users
- Index [token required]
# Index Route: /users   [GET]
- Show [token required]
# Show Route: /users/:id  [GET]
- Create N[token required]
# Create Route: /users [POST]

#### Orders
- Current Order by user (args: user id)[token required]
 # current order by user_id  Route: /users/:user_id/orders [GET]
-Specific Order by user
 # Specific Order by user Route: /users/:user_id/orders/:order_id [GET]
-Add Product To Order
 # Add Product To Order Route: /users/:user_id/orders/:order_id/products [POST]

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

-TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price float, category VARCHAR(100))

#### User
- id
- firstName
- lastName
- password

-TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), password VARCHAR)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

-TABLE orders (
id SERIAL PRIMARY KEY,
user_id bigint [foreign key to users table],
statusoforder VARCHAR(10)
);

#### order_products
TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity float,
    order_id integer [foreign key to orders table],
    product_id integer [foreign key to products table]
);

