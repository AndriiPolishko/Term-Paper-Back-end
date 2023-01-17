const pool = require('../db/db');

const getHousings = async (req, res) => {
  try {
    const { city, housingType } = req.query;
    let { price } = req.query;

    price = !price || price === 'undefined' ? Infinity : price;
    let housings;
    if (city && housingType) {
      const dbReq = await pool.query(
        'SELECT * FROM housings WHERE city = $1 AND housing_type = $2 AND price < $3',
        [city, housingType, price]
      );
      housings = dbReq.rows;
    } else if (city) {
      const dbReq = await pool.query(
        'SELECT * FROM housings WHERE city = $1 AND price < $2',
        [city, price]
      );
      housings = await dbReq.rows;
    } else if (housingType) {
      const dbReq = await pool.query(
        'SELECT * FROM housings WHERE housing_type = $1 AND price < $2',
        [housingType, price]
      );
      housings = dbReq.rows;
    } else {
      const dbReq = await pool.query(
        'SELECT * FROM housings WHERE price < $1',
        [price]
      );
      housings = dbReq.rows;
    }

    if (housings) {
      res.status(200).json(housings);
    } else {
      res.status(200).json('No housing was found');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addHousing = async (req, res) => {
  try {
    const {
      name,
      city,
      street,
      housingNumber,
      housingType,
      price,
      ownerEmail,
    } = req.body;

    const realtor = await pool.query(
      'SELECT * FROM realtors WHERE email = $1',
      [ownerEmail]
    );

    if (realtor.rowCount == 0) {
      res.status(400).json({ message: 'No realtor with such email' });
    }

    await pool.query(
      `INSERT INTO housings (name, city, street, housing_number, housing_type, price, owner_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        name,
        city,
        street,
        housingNumber,
        housingType,
        price,
        realtor.rows[0].id,
      ]
    );
    res.status(201).json(`Housing was created`);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
