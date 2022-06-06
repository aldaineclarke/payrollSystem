DROP DATABASE IF EXISTS `payrollDB`;
CREATE DATABASE `payrollDB` COLLATE=latin1_general_ci CHARSET=latin1;

USE `payrollDB`;


CREATE TABLE address(
	id INT AUTO_INCREMENT,
	line_1 VARCHAR(60),
    line_2 VARCHAR(60),
    parish VARCHAR(20),
    PRIMARY KEY(id)
);
ALTER TABLE address AUTO_INCREMENT = 200;
INSERT INTO address (line_1, line_2, parish) 
VALUES ("Success Street", "Potential Ville", "St. Catherine"),("Victory Way", "Morrant City", "St. Thomas");


CREATE TABLE employees(
emp_id INT AUTO_INCREMENT NOT NULL,
fname VARCHAR(20) NOT NULL,
lname VARCHAR(20) NOT NULL,
username VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL,
is_admin BIT DEFAULT 0,
password VARCHAR(60) NOT NULL,
address_id INT NOT NULL REFERENCES address (id),
date_joined DATE NOT NULL DEFAULT NOW(),
manager_id INT REFERENCES employees(id),
PRIMARY KEY (emp_id)
);

ALTER TABLE employees AUTO_INCREMENT = 13543201;

INSERT INTO employees (fname, lname, email,username, password,address_id)
VALUES ("Vaine", "Dev", "vainedev@gmail.com", "vaineDev", "password123", 201),
("Danny", "Morris", "tester1@gmail.com", "DannyMorris", "password1", 202)
;

CREATE TABLE timecard(
	id INT AUTO_INCREMENT,
	emp_id INT REFERENCES employees(id),
    loginTime DATETIME DEFAULT NOW(),
    logoutTime DATETIME,
    status VARCHAR(20) DEFAULT "Awaiting",    
    PRIMARY KEY(id)
);
ALTER TABLE timecard AUTO_INCREMENT = 45000;


CREATE TABLE taxes (
	tax_id VARCHAR(30),
    tax_percentage FLOAT,
    description VARCHAR(255)
);



INSERT INTO taxes (tax_id, tax_percentage, description)
VALUES ("EDU_TAX", 2.25, "Education Tax which is charged at 2.25%"),
("NIS_TAX", 3.0, "Insurance tax with a contribution of 3%"),
("NHT_TAX", 2.0, "National Housing Trust which are refunded after several years, which is charged at 2%");

CREATE TABLE payroll(
	emp_id INT REFERENCES employees(emp_id),
    salary INT NOT NULL,
    date_paid INT NOT NULL,
    PRIMARY KEY (emp_id, date_paid)
    
);
