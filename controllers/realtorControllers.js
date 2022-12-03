const asyncHandler = require('express-async-handler');
const Realtor = require('../models/realtorModel');

const getRealtors = asyncHandler(async (req, res) => {
  const realtors = await Realtor.find();
  res.json(realtors);
});

const getRealtor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const realtor = await Realtor.findById(id);
  if (!realtor) {
    res.status(400);
    throw new Error(`Realtor with id ${id} not found`);
  }
  res.json(realtor);
});

const setRealtor = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name, email, password, city, score, bureau } = body;
  if (!name || !email || !password || !score) {
    res.status(400);
    throw new Error('Please provide all needed fields for the realtor');
  }
  const newRealtor = await Realtor.create({
    name,
    email,
    password,
    city,
    score,
    bureau,
  });
  res.json(newRealtor);
});

const updateRealtor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const realtor = await Realtor.findById(id);
  if (!realtor) {
    res.status(400);
    throw new Error(`Realtor with id ${id} not found`);
  }
  const updatedRealtor = await Realtor.findByIdAndUpdate(id, body);
  res.json(updatedRealtor);
});

const deleteRealtor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const realtor = await Realtor.findById(id);
  if (!realtor) {
    res.status(400);
    throw new Error(`Realtor with id ${id} not found`);
  }
  const deletedRealtor = await Realtor.findByIdAndDelete(id);
  res.json(deletedRealtor);
});

module.exports = {
  getRealtors,
  getRealtor,
  setRealtor,
  updateRealtor,
  deleteRealtor,
};
