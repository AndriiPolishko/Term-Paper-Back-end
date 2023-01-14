const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  signUp,
  logIn,
  getAllUsers,
  getUser,
  updateUser,
  //  deleteUser,
} = require('../controllers/userControllers');

router.post('/', signUp);
router.post('/login', logIn);
router.get('/', getAllUsers);
router.get('/me', protect, getUser);
router.put('/:id', protect, updateUser);

module.exports = router;
