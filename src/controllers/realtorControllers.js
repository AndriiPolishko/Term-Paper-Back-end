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
    const scoreArray = [score];
    await pool.query(
      `INSERT INTO realtors(first_name, second_name, city, email, score, all_scores) VALUES ($1,$2,$3,$4,$5, $6)`,
      [firstName, secondName, city, email, score, scoreArray]
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

const getRealtorById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getRealtor = await pool.query(
      'SELECT * FROM realtors WHERE id = $1',
      [id]
    );
    const realtor = getRealtor.rows[0];
    res.status(200).json(realtor);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getRealtorByEmailAndScore = asyncHandler(async (req, res) => {
  try {
    const email = req.query.email == 'undefined' ? undefined : req.query.email;
    const score = req.query.score == 'undefined' ? 1 : req.query.score;
    console.log('email: ' + email + '  score: ' + score);
    if (email) {
      const realtor = await pool.query(
        'SELECT * FROM realtors where email = $1 AND score >= $2',
        [email, score]
      );
      res.status(200).json(realtor.rows);
    } else {
      const realtor = await pool.query(
        'SELECT * FROM realtors where score >= $1',
        [score]
      );
      console.log(realtor.rows);
      res.status(200).json(realtor.rows);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateScore = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newScore } = req.body;

  await pool.query(
    `UPDATE realtors SET all_scores = ARRAY_APPEND(all_scores, $1) WHERE id = $2`,
    [newScore, id]
  );

  const scores = (
    await pool.query(`SELECT all_scores FROM realtors WHERE id = $1`, [id])
  ).rows[0].all_scores;

  const score = Math.round(
    scores.reduce((accum, currentValue) => currentValue + accum, 0) /
      scores.length
  );
  res.json(score);
});

module.exports = {
  deleteRealtor,
  addRealtor,
  getRealtorById,
  getRealtors,
  getRealtorByEmailAndScore,
  updateScore,
};
