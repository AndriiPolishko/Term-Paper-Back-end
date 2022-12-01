const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'Please enter an unique email'],
      unique: true,
    },
    password: { type: String, required: [true, 'Please enter a password'] },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'City',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userModel);
