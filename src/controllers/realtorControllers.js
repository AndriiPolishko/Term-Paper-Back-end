const pool = require('../db/db');
const asyncHandler = require('express-async-handler');

const getRealtors = asyncHandler(async (req, res) => {
  try {
    const realtor = await pool.query('SELECT * FROM realtors');
    res.status(200).json(realtor.rows);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addRealtor = asyncHandler(async (req, res) => {
  try {
    const { firstName, secondName, city, email, score } = req.body;
    await pool.query(
      `INSERT INTO realtors(first_name, second_name, city, email, score) VALUES ($1,$2,$3,$4,$5)`,
      [firstName, secondName, city, email, score]
    );
    res.status(200).json({ firstName, secondName, city, email, score });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const deleteRealtor = asyncHandler(async (req, res) => {
  try {
    const email = req.query.email;
    await pool.query('DELETE FROM realtors WHERE email = $1', [email]);
    res.status(200).json({ message: 'Realtor was deleted' });
  } catch (error) {
    throw new Error(error.message);
  }
});

const getRealtorByEmail = asyncHandler(async (req, res) => {});

module.exports = { deleteRealtor, addRealtor, getRealtorByEmail, getRealtors };
