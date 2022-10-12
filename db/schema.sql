DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db

USE employee_db

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
);




INSERT INTO department(name)
VALUES  ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role(title, salary, department_id)
VALUES  ('Salesperson', "80000", '1'), 
        ('Lead Engineer', '150000', '2'), 
        ('Software Engineer', '120000', '2'),
        ('Account Manager', '160000', '3'),
        ('Accountant', '125000', '3'),
        ('Legal Team Lead', '250000', '4'),
        ('Lawyer', '190000', '4');


INSERT INTO employee(first_name, last_name, role_id)
VALUES  ('Mike', 'Chan', 'Salesperson'),
        ('Ashley', 'Rodriguez', 'Lead Engineer'),
        ('Kevin', 'Tupik', 'Software Engineer'),
        ('Kunal', 'Singh', 'Account Manager'),
        ('Malia', 'Brown', 'Accountant'),
        ('Sarah', 'Lourd', 'Legal Team Lead'),
        ('Tim', 'Allen''Lawyer');