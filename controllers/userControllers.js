const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error(`User with id ${id} not found`);
  }
  res.json(user);
});

const setUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name, email, password, city } = body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please provide all necessary fields`);
  }
  const user = await User.create({
    name,
    email,
    password,
    city,
  });
  res.json(user);
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

module.exports = { getUsers, getUser, setUser, updateUser, deleteUser };
