const { isCelebrateError } = require('celebrate');
const { SERVER_ERROR, BAD_REQUEST } = require('../utils/messages');

module.exports.errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({ message: BAD_REQUEST });
  } else {
    const { code = 500, message } = err;
    res.status(code).send({ message: code === 500 ? SERVER_ERROR : message });
  }
  next();
};
