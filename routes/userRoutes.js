const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');

router.route('/').get(getUsers).post(setUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
