//const asyncHandler = require("express-async-handler")
const pool = require('../db/db');
const tableName = 'users';
const database = process.env.DATABASE;

const getAllUsers = async (req, res) => {
  try {
    const users = await await (await pool.query('SELECT * FROM users')).rows;
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const theUser = await (
    await pool.query('SELECT * FROM users WHERE id = ($1)', [id])
  ).rows;
  res.json(theUser);
};

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
};

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
