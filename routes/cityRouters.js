const express = require('express');
const router = express.Router();

const {
  getCities,
  getCity,
  setCity,
  updateCity,
  deleteCity,
} = require('../controllers/cityControllers');

router.route('/').get(getCities).post(setCity);
router.route('/:id').get(getCity).put(updateCity).delete(deleteCity);

module.exports = router;
