DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  customer_price DECIMAL(10,2) default 0,
  stock_quanity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Wilson Pro Staff", "Equipment", 219.00, 100);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Babolat Pure Aero", "Equipment", 209.00, 89);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Prince Text", "Equipment", 189.00, 70);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Adidas Skirt", "Apparel", 55.00, 43);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Nike Shorts", "Apparel", 75.00, 30);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Nike Tank", "Apparel", 50.00, 37);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Adidas Top", "Apparel", 55.00, 57);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Adidas Ubersonic Shoes", "Shoes", 124.95, 28);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Nike Air Zoom Shoes", "Shoes", 140.00, 23);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Tennis Balls Case", "Equipment", 78.99, 125);

INSERT INTO products (product_name, department, customer_price, stock_quanity)
VALUES ("Wilson Tennis Bag", "Equipment", 119.00, 15);
