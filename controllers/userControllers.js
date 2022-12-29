const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// @desc   Get user data
// @route  GET /api/user/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const _id = req.user.id;
  const { name, email } = await User.findById(id);
  // const user = await User.findById(id);
  // if (!user) {
  //   res.status(400);
  //   throw new Error(`User with id ${id} not found`);
  // }
  // res.json(user);
  res.status(201).json({ _id, name, email });
});

// @desc   Register new user
// @route  POST /api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name, email, password, city } = body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please provide all necessary fields`);
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(`User exists`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    city,
  });

  if (!user) {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
  res
    .status(201)
    .json({ _id: user.id, name, email, token: generateToken(user.id) });
});

// @desc   User Login
// @route  POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error(`Invalid credentials`);
  }
  res.json({
    _id: user.id,
    name: user.name,
    email,
    token: generateToken(user.id),
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error(`User with id ${id} not found`);
  }
  const updatedUser = await User.findByIdAndUpdate(id, body);
  res.json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error(`User with id ${id} not found`);
  }

  const deletedUser = await User.findByIdAndDelete(id);
  console.log(deletedUser);
  res.json(deletedUser);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  getMe,
  registerUser,
  loginUser,
};
