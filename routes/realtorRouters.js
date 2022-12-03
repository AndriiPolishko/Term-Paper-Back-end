const express = require('express');
const router = express.Router();

const {
  getRealtors,
  getRealtor,
  setRealtor,
  updateRealtor,
  deleteRealtor,
} = require('../controllers/realtorControllers');

router.route('/').get(getRealtors).post(setRealtor);
router.route('/:id').get(getRealtor).put(updateRealtor).delete(deleteRealtor);
module.exports = router;
