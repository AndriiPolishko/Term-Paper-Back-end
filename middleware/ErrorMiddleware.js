const errorMiddleware = (err, req, res, next) => {
  const status = req.status ? req.status : 500;
  res.status(status);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorMiddleware };
