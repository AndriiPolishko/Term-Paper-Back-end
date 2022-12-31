const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
