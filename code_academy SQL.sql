CREATE TABLE user (
id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
surname VARCHAR(30) NOT NULL,
email VARCHAR(50),
age INT(2) NOT NULL,
isActive BOOLEAN
);

select * from user;

INSERT INTO user (name, surname, email,age,IsActive)
VALUES ('Martin','Martinovski','martin@gmail.com',20,false
);