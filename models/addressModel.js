const mongoose = require('mongoose');

const addressModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the name of the address'],
      unique: true,
    },
  },
  { city: { type: mongoose.Schema.Types.ObjectId, required: true } },
  { timestamps: true }
);

module.exports = mongoose.model('Address', mongoose.model(addressModel));
