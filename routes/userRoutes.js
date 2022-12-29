const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  getMe,
  registerUser,
  loginUser,
} = require('../controllers/userControllers');

router
  .get('/me', protect, getMe)
  .post('/', registerUser)
  .post('/login', loginUser);

module.exports = router;
