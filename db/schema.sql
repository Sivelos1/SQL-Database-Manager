DROP DATABASE IF EXISTS inventory_db;
-- Creates the inventory_db database --
CREATE DATABASE inventory_db;

-- use inventory_db database --
USE inventory_db;


-- Department Table
CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

-- Role Table
CREATE TABLE roles (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- Employee Table
CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
