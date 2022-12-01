const express = require('express');
const router = express.Router();

const {
  getAddresses,
  getAddress,
  setAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressControllers');

router.route('/').get(getAddresses).post(setAddress);
router.route('/:id').get(getAddress).put(updateAddress).delete(deleteAddress);

module.exports = router;
