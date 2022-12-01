const mongoose = require('mongoose');

const cityModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['true', 'Please enter the city name'],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('City', cityModel);
