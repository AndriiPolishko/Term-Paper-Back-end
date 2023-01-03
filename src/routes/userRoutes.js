const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// const {
//   getAllUsers,
//   getUser,
//   addUser,
//   updateUser,
//   deleteUser,
// } = require('../controllers/userControllers');

// router.route('/').get(getAllUsers).post(addUser);
// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

const { signUp, logIn, getUser } = require('../controllers/userControllers');

router.post('/', signUp);
router.post('/login', logIn);
router.get('/me', protect, getUser);

module.exports = router;
