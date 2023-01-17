const express = require('express');
const router = express.Router();

const {
  getRealtors,
  getRealtorByEmail,
  addRealtor,
  deleteRealtor,
} = require('../controllers/realtorControllers');

router.route('/').get(getRealtors).post(addRealtor);
router.route('/:email').get(getRealtorByEmail);
router.delete('/', deleteRealtor);

module.exports = router;
