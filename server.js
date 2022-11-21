const express = require('express');
const dotenv = require('dotenv').config();
const { errorMiddleware } = require('./middleware/ErrorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // middleware that enables usage of raw json in body
app.use(express.urlencoded({ extended: false })); // middleware that enables usage of urlEncoded in body

app.use('/api/housing', require('./routes/housingRoutes.js'));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
