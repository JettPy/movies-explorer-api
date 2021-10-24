const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');
const { JWT_DEV_SECRET } = require('../utils/config');
const { UNAUTHORIZED_JWT } = require('../utils/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new HttpError(401, UNAUTHORIZED_JWT);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
  } catch (err) {
    throw new HttpError(401, UNAUTHORIZED_JWT);
  }
  req.user = payload;
  return next();
};
