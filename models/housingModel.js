const mongoose = require('mongoose');

const housingModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Housing', housingModel);
