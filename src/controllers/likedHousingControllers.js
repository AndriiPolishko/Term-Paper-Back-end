const pool = require('../db/db');
const asyncHandler = require('express-async-handler');

const tableName = 'liked_housings';

const getLikedHousing = asyncHandler(async (req, res) => {
  try {
    const userId = req.query.userId;
    const housingId = req.query.housingId;
    const findUser = await pool.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);
    const findHousing = await pool.query(
      'SELECT * FROM housings WHERE id = $1',
      [housingId]
    );
    const housings = findHousing.rows;
    res.status(200).json(housings);
  } catch (error) {}
});

const addLikedHousing = asyncHandler(async (req, res) => {
  try {
    const { housingId, userId } = req.body;
    const createLikedHousing = await pool.query(
      `INSERT INTO ${tableName} (housing_id, user_id) VALUES ($1, $2)`,
      [housingId, userId]
    );
    res.status(200).json({ message: 'Housing successfully saved to liked' });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { getLikedHousing, addLikedHousing };
