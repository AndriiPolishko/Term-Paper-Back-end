const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./src/middleware/errorMiddleware');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // middleware that enables usage of raw json in body
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/housing', require('./src/routes/housingRoutes'));
app.use('/api/realtor', require('./src/routes/realtorRoutes'));
app.use('/api/liked-housing', require('./src/routes/likedHousingRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
