const express = require('express');
const dotenv = require('dotenv').config();
const { errorMiddleware } = require('./middleware/ErrorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json()); // middleware that enables usage of raw json in body
app.use(express.urlencoded({ extended: false })); // middleware that enables usage of urlEncoded in body

app.use('/api/housing', require('./routes/housingRoutes.js'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/city', require('./routes/cityRouters'));

app.use('/api/address', require('./routes/addressRouters'));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
