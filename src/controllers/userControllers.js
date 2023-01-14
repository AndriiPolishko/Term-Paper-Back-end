const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const tableName = 'users';
const database = process.env.DATABASE;
/*
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.json('User was deleted');
  } catch (error) {
    console.log(error.message);
  }
}; */

// @desc    Register a new user
// @route   POST /api/user
// @access  PUBLIC
const signUp = asyncHandler(async (req, res) => {
  const { firstName, secondName, city, email, password } = req.body;
  const isAdmin = req.body.isAdmin === undefined ? false : true;
  //need to rewrite
  if (!firstName || !secondName || !city || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const userExists = (
    await pool.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email])
  ).rows[0];

  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await pool.query(
    `INSERT INTO ${tableName} (first_name, second_name, city, email, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [firstName, secondName, city, email, hashedPassword, isAdmin]
  );
  if (user) {
    res.status(201).json({
      id: user.rows[0].id,
      firstName,
      secondName,
      email,
      city,
      token: generateJWT(user.rows[0].id),
      isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Incorrect data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  PUBLIC
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error('All fields have to be provided!');
  }
  const getUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  const user = getUser.rows[0];
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      firstName: user.first_name,
      secondName: user.second_name,
      email: user.email,
      city: user.city,
      token: generateJWT(user.id),
      isAdmin: user.is_admin,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Get info of logged in user
// @route   POST /api/user/me
// @access  PRIVATE
const getAllUsers = async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  const userData = users.rows;
  res.json(userData);
};

// @desc    Get info of logged in user
// @route   POST /api/user/me
// @access  PRIVATE
const getUser = async (req, res) => {
  const { first_name, second_name, email } = req.user;
  res.json({ first_name, second_name, email });
};

// @desc    Update user by id
// @route   POST /api/user/:id
// @access  PRIVATE

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let user;

    const { firstName, secondName, email, city, password } = req.body;

    if (firstName) {
      await pool.query(`UPDATE users SET first_name = $1 WHERE id = $2`, [
        firstName,
        id,
      ]);
    }

    if (secondName) {
      await pool.query(`UPDATE users SET second_name = $1 WHERE id = $2`, [
        secondName,
        id,
      ]);
    }

    if (email) {
      await pool.query(`UPDATE users SET email = $1 WHERE id = $2`, [
        email,
        id,
      ]);
    }

    if (city) {
      await pool.query(`UPDATE users SET city = $1 WHERE id = $2`, [city, id]);
    }

    if (!user) {
      user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    }
    const userData = user.rows[0];

    res.status(200).json({
      firstName: userData.first_name,
      secondName: userData.second_name,
      email: userData.email,
      city: userData.city,
      token: generateJWT(userData.id),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // can add third parameter for expiration period, like 30d
};

module.exports = { getAllUsers, signUp, logIn, getUser, updateUser };
