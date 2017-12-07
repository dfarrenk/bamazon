DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamegoy", "Electronics", 79.99, 200), ("Bamegoy Advance", "Electronics", 149.99, 150), ("Smartphone", "Electronics", 200, 20), ("Television", "Electronics", 400, 5), ("Frige", "Appliances", 350, 10), ("Washing Machine", "Appliances", 200, 5), ("Dryer", "Appliances", 150, 3), ("Shirts", "Clothing", 20, 100), ("Socks", "Clothing", 5, 300), ("Shoes", "Clothing", 50, 20);