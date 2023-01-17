const express = require('express');
const router = express.Router();

const {
  getRealtors,
  getRealtorById,
  addRealtor,
  deleteRealtor,
  getRealtorByEmailAndScore,
  updateScore,
} = require('../controllers/realtorControllers');

router.route('/').get(getRealtors).post(addRealtor);
router.delete('/', deleteRealtor);
router.get('/byEmailAndScore', getRealtorByEmailAndScore);
router.route('/:id').get(getRealtorById).put(updateScore);

module.exports = router;
