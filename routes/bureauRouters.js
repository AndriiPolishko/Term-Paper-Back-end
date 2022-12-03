const express = require('express');
const router = express.Router();

const {
  getBureaus,
  getBureau,
  setBureau,
  updateBureau,
  deleteBureau,
} = require('../controllers/bureauControllers');

router.route('/').get(getBureaus).post(setBureau);
router.route('/:id').get(getBureau).put(updateBureau).delete(deleteBureau);

module.exports = router;
