const express = require('express');
const router = express.Router();

const {
  getLikedHousing,
  addLikedHousing,
} = require('../controllers/likedHousingControllers');

router.route('/').get(getLikedHousing).post(addLikedHousing);

module.exports = router;
