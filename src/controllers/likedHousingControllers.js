const pool = require('../db/db');
const asyncHandler = require('express-async-handler');

const tableName = 'liked_housings';

const getLikedHousing = asyncHandler(async (req, res) => {
  try {
    const userId = req.query.userId;
    const findByUser = await pool.query(
      `SELECT * FROM ${tableName} WHERE user_id = $1`,
      [userId]
    );
    const idsOfHousings = findByUser.rows.map((row) => row.housing_id);
    const result = [];
    for (const id of idsOfHousings) {
      const findHousing = await pool.query(
        'SELECT * FROM housings WHERE id = $1',
        [id]
      );
      result.push(findHousing.rows[0]);
    }

    res.status(200).json({ result });
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

const deleteLikedHousing = asyncHandler(async (req, res) => {
  try {
    const { housingId, userId } = req.body;
    await pool.query(
      `DELETE FROM ${tableName} WHERE housing_id = $1 AND user_id = $2`,
      [housingId, userId]
    );
    res
      .status(200)
      .json({ message: 'Housing was successfully deleted from liked' });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { getLikedHousing, addLikedHousing, deleteLikedHousing };
