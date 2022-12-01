const mongoose = require('mongoose');
const User = require('./userModel');

const Realtor = User.discriminator(
  'Realtor',
  new mongoose.Schema(
    { score: { type: Number, required: true } },
    {
      bureau: { type: mongoose.Types.ObjectId, required: true, ref: 'Bureau' },
    },
    { timestamps: true }
  )
);

module.exports = Realtor;
