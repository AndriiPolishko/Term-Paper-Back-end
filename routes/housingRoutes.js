const express = require('express');
const router = express.Router();

const {
  getHousing,
  setHousing,
  updateHousing,
  deleteHousing,
} = require('../controllers/housingControllers');

router.route('/').get(getHousing).post(setHousing);

router.route('/:id').put(updateHousing).delete(deleteHousing);

module.exports = router;
