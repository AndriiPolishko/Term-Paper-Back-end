const express = require('express');
const router = express.Router();

const {
  getRealtors,
  getRealtorByName,
  addRealtor,
  deleteRealtor,
} = require('../controllers/realtorControllers');

router.route('/').get(getRealtors).post(addRealtor);
router.route('/:name').get(getRealtorByName).delete(deleteRealtor);

module.exports = router;
