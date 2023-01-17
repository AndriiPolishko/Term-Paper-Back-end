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
  all_scores INT ARRAY,
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
  housing_id int REFERENCES housings(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id int REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);