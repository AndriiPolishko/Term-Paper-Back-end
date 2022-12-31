const express = require('express');
const router = express.Router();

const {
  getHousings,
  addHousing,
  deleteHousing,
} = require('../controllers/housingControllers');

router.route('/').get(getHousings).post(addHousing);
router.route('/:id').delete(deleteHousing);

module.exports = router;
