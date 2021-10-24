const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');
const { UNAUTHORIZED_JWT } = require('../utils/messages');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new HttpError(401, UNAUTHORIZED_JWT);
  }
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new HttpError(401, UNAUTHORIZED_JWT);
  }
  req.user = payload;
  return next();
};
