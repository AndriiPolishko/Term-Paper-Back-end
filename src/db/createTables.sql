CREATE DATABASE termpaper;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  second_name VARCHAR(32),
  city VARCHAR(32),
  email VARCHAR(64),
  password VARCHAR(100),
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE realtors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  second_name VARCHAR(32),
  city VARCHAR(32),
  email VARCHAR(64),
  password VARCHAR(100),
  score INT
);

CREATE TABLE housings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  city VARCHAR(32),
  street VARCHAR(32),
  housing_number VARCHAR(32),
  housing_type VARCHAR(32),
  price NUMERIC,
  owner_id int,
  CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES realtors(id)
);

CREATE TABLE liked_housings (
  id SERIAL PRIMARY KEY,
  housing_id int,
  user_id int,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_housing FOREIGN KEY(housing_id) REFERENCES housings(id)
);