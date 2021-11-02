const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../utils/HttpError');
const { JWT_SECRET } = require('../utils/config');
const {
  USER_NOT_FOUND, CONFLICT, BAD_REQUEST, OK_SIGNIN, OK_SIGNOUT,
} = require('../utils/messages');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new HttpError(404, USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail(new HttpError(404, USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new HttpError(409, CONFLICT));
      } else {
        next(new HttpError(400, BAD_REQUEST));
      }
    })
    .catch(next);
};

module.exports.registration = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name })
      .then((user) => res.send({
        email: user.email,
        name: user.name,
      }))
      .catch((err) => {
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new HttpError(409, CONFLICT));
        } else {
          next(new HttpError(400, BAD_REQUEST));
        }
      }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }).send({ message: OK_SIGNIN });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }).send({ message: OK_SIGNOUT });
};
