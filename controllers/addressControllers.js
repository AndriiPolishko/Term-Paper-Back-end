const asyncHandler = require('express-async-handler');

const Address = require('../models/addressModel');

const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find();
  res.json(addresses);
});

const getAddress = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const address = await Address.findById(id);
  if (!address) {
    res.status(400);
    throw new Error(`Address with id ${id} not found`);
  }
  res.json(address);
});

const setAddress = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name, city } = body;
  if (!name || !city) {
    res.status(400);
    throw new Error('Please provide the name for the address');
  }
  const newAddress = await Address.create({ name, city });
  res.json(newAddress);
});

const updateAddress = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const address = await Address.findById(id);
  if (!address) {
    res.status(400);
    throw new Error(`Address with id ${id} not found`);
  }
  const updatedAddress = await Address.findByIdAndUpdate(id, body);
  res.json(updatedAddress);
});

const deleteAddress = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const address = await Address.findById(id);
  if (!address) {
    res.status(400);
    throw new Error(`Address with id ${id} not found`);
  }
  const deletedAddress = await Address.findByIdAndDelete(id);
  res.json(deletedAddress);
});

module.exports = {
  getAddresses,
  getAddress,
  setAddress,
  updateAddress,
  deleteAddress,
};
