const asyncHandler = require('express-async-handler');
const Bureau = require('../models/bureauModel');

const getBureaus = asyncHandler(async (req, res) => {
  const bureaus = await Bureau.find();
  res.json(bureaus);
});

const getBureau = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const bureau = await Bureau.findById(id);
  if (!bureau) {
    res.status(400);
    throw new Error(`Bureau with id ${id} not found`);
  }
  res.json(bureau);
});

const setBureau = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name, realtors } = body;
  if (!name) {
    res.status(400);
    throw new Error('Please provide the name for the bureau');
  }
  const newBureau = await Bureau.create({ name, realtors });
  res.json(newBureau);
});

const updateBureau = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const bureau = await Bureau.findById(id);
  if (!bureau) {
    res.status(400);
    throw new Error(`Bureau with id ${id} not found`);
  }
  const updatedBureau = await Bureau.findByIdAndUpdate(id, body);
  res.json(updatedBureau);
});

const deleteBureau = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const bureau = await Bureau.findById(id);
  if (!bureau) {
    res.status(400);
    throw new Error(`Bureau with id ${id} not found`);
  }
  const deletedBureau = await Bureau.findByIdAndDelete(id);
  res.json(deletedBureau);
});

module.exports = {
  getBureaus,
  getBureau,
  setBureau,
  updateBureau,
  deleteBureau,
};
