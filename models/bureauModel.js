const mongoose = require('mongoose');

const bureauModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the bureau'],
      unique: true,
    },
    realtors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Realtor' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bureau', bureauModel);
