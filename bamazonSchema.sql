DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  customer_price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  product_sales DECIMAL(10,2) default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Wilson Pro Staff", "Equipment", 219.00, 100, 1670.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Babolat Pure Aero", "Equipment", 209.00, 89, 1432.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Prince Textreme", "Equipment", 189.00, 70, 732.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Adidas Skirt", "Apparel", 55.00, 43, 455.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Nike Shorts", "Apparel", 75.00, 30, 798.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Nike Tank", "Apparel", 50.00, 37, 230.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Adidas Top", "Apparel", 55.00, 57, 852.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Adidas Ubersonic", "Shoes", 124.95, 28, 1249.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Nike Air Zoom", "Shoes", 140.00, 23, 1085.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Case Tennis Balls", "Equipment", 78.99, 125, 1828.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Wilson Tennis Bag", "Equipment", 119.00, 15, 849.00);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2) default 0,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Equipment", 6000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apparel", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Shoes", 3000);
