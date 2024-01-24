DROP DATABASE IF EXISTS mysql_first_day_db;

CREATE DATABASE mysql_first_day_db;

USE mysql_first_day_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

-- INSERT INTO users (username, email, password) VALUES
--  ('shannon', 'shan@test.com', 'pass111'),
--  ('meep', 'meep@test.com', 'pass222'),
--  ('liz', 'liz@test.com', 'pass333');

-- SELECT * FROM users;
