const expressAsyncHandler = require('express-async-handler');
const Housing = require('../models/housingModel');
const { options } = require('../routes/housingRoutes');
//@desc get housings
//@route GET /api/housing
//@access Public
const getHousing = expressAsyncHandler(async (req, res) => {
  const housings = await Housing.find();
  res.json({ housings });
});

//@desc set housings
//@route Post /api/housing
//@access Public
const setHousing = expressAsyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.name || !body.city || !body.type) {
    res.status(500);
    throw new Error('Please supply all needed fields');
  }

  const housing = await Housing.create({
    name: body.name,
    city: body.city,
    type: body.type,
  });
  console.log(req.body);
  res.json(housing);
});

//@desc update housings
//@route Put /api/housing/:id
//@access Public
const updateHousing = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedHousing = await Housing.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedHousing);
});

//@desc delete housings
//@route Put /api/housing/:id
//@access Public
const deleteHousing = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!(await Housing.findById(id))) {
    res.status(400);
    throw Error("Item with this id doesn't exist");
  }

  const deletedHousing = await Housing.findByIdAndDelete(id);
  res.json(deletedHousing);
});

module.exports = { getHousing, setHousing, updateHousing, deleteHousing };
