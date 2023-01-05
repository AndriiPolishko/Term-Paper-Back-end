const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const pool = require('../db/db');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth) {
    try {
      token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await pool.query(
        `SELECT first_name, second_name, email, city FROM users WHERE id = $1`,
        [decoded.id]
      );
      req.user = user.rows[0];
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token is not provided');
  }
});

module.exports = { protect };
