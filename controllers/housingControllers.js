const expressAsyncHandler = require('express-async-handler');

//@desc get housings
//@route GET /api/housing
//@access Public
const getHousing = expressAsyncHandler(async (req, res) => {
  res.json({ action: 'get housing' });
});

//@desc set housings
//@route Post /api/housing
//@access Public
const setHousing = expressAsyncHandler(async (req, res) => {
  if (!req.body.test) {
    res.status(400);
    throw new Error('Needed info not supplied');
  }
  console.log(req.body);
  res.json({ action: 'set housing' });
});

//@desc update housings
//@route Put /api/housing/:id
//@access Public
const updateHousing = expressAsyncHandler(async (req, res) => {
  res.json({ action: `updated housing with id ${req.params.id}` });
});

//@desc delete housings
//@route Put /api/housing/:id
//@access Public
const deleteHousing = expressAsyncHandler(async (req, res) => {
  res.json({ action: `deleted housing with id ${req.params.id}` });
});

module.exports = { getHousing, setHousing, updateHousing, deleteHousing };
