const pool = require('../db/db');

const getHousings = async (req, res) => {
  try {
    let { city, price } = req.query;
    price = price === undefined ? Infinity : price;
    if (city) {
      const housings = await pool.query(
        'SELECT * FROM housings WHERE city = $1 AND price <= $2',
        [city, price]
      );
      res.status(200).json(housings.rows);
    } else {
      const housings = await pool.query(
        'SELECT * FROM housings WHERE price <= $1',
        [price]
      );
      if (housings.rows) {
        res.status(200).json(housings.rows);
      } else {
        res.status(200).json('No housing was found');
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addHousing = async (req, res) => {
  try {
    const { name, city, street, housingNumber, housingType, price } = req.body;
    await pool.query(
      `INSERT INTO housings (name, city, street, housing_number, housing_type, price) VALUES ($1,$2,$3,$4,$5,$6)`,
      [name, city, street, housingNumber, housingType, price]
    );
    res.status(201).json(`Housing was created`);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteHousing = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM housings WHERE id = $1`, [id]);
    res.json(`Housing with id ${id} was deleted`);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getHousings, addHousing, deleteHousing };
