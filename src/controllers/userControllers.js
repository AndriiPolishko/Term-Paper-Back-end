const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const tableName = 'users';
const database = process.env.DATABASE;
/*


const getAllUsers = async (req, res) => {
  try {
    const users = await await (await pool.query('SELECT * FROM users')).rows;
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

// const getUser = async (req, res) => {
//   const id = req.params.id;
//   const theUser = await (
//     await pool.query('SELECT * FROM users WHERE id = ($1)', [id])
//   ).rows;
//   res.json(theUser);
// };

const addUser = async (req, res) => {
  try {
    const { firstName, secondName, email, city, password } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users (first_name, second_name, city, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, secondName, email, city, password]
    );

    res.json(newUser);
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, secondName, email, city, password } = req.body;

    if (firstName)
      await pool.query(`UPDATE users SET first_name = $1 WHERE id = $2`, [
        firstName,
        id,
      ]);
    ///
    /// The rest will be added after addition of JWT
    ///
    res.json({ res: 'Updated' });
  } catch (error) {
    console.log(error.message);
  }
};

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

  //need to rewrite
  if (!firstName && !secondName && !city && !email && !password) {
    res.status(400);
    throw new Error("User's info is lacking");
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
    `INSERT INTO ${tableName} (first_name, second_name, city, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [firstName, secondName, city, email, hashedPassword]
  );
  if (user) {
    res.status(201).json({
      firstName,
      secondName,
      email,
      token: generateJWT(user.rows[0].id),
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
  const getUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  const user = getUser.rows[0];
  if (user && (await bcrypt.compare(password, user.password))) {
    const name = `${user.first_name} ${user.second_name}`;
    res
      .status(200)
      .json({ name, email: user.email, token: generateJWT(user.id) });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// @desc    Get info of logged in user
// @route   POST /api/user/me
// @access  PRIVATE
const getUser = async (req, res) => {
  const { first_name, second_name, email } = req.user;
  res.json({ first_name, second_name, email });
};

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // can add third parameter for expiration period, like 30d
};

//module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
module.exports = { signUp, logIn, getUser };
