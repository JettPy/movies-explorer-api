const { SERVER_ERROR } = require('../utils/messages');

module.exports.errorHandler = (err, req, res, next) => {
  const { code = 500, message } = err;
  res.status(code).send({ message: code === 500 ? SERVER_ERROR : message });
  next();
};
