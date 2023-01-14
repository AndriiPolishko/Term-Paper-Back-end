const express = require('express');
const router = express.Router();

const {
  getLikedHousing,
  addLikedHousing,
  deleteLikedHousing,
} = require('../controllers/likedHousingControllers');

router
  .route('/')
  .get(getLikedHousing)
  .post(addLikedHousing)
  .delete(deleteLikedHousing);

module.exports = router;
