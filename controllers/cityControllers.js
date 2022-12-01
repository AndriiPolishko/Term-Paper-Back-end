const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const City = require('../models/cityModel');

const getCities = asyncHandler(async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

const getCity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const city = await City.findById(id);
  if (!city) {
    res.status(400);
    throw new Error(`City with id ${id} not found`);
  }
  res.json(city);
});

const setCity = asyncHandler(async (req, res) => {
  const body = req.body;
  const { name } = body;
  if (!name) {
    res.status(400);
    throw new Error('Please provide the name for the city');
  }
  const newCity = await City.create({ name });
  res.json(newCity);
});

const updateCity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const city = await City.findById(id);
  if (!city) {
    res.status(400);
    throw new Error(`City with id ${id} not found`);
  }
  const updatedCity = await City.findByIdAndUpdate(id, body);
  res.json(updatedCity);
});

const deleteCity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const city = await City.findById(id);
  if (!city) {
    res.status(400);
    throw new Error(`City with id ${id} not found`);
  }
  const deletedCity = await City.findByIdAndDelete(id);
  res.json(deletedCity);
});

module.exports = { getCities, getCity, setCity, updateCity, deleteCity };
