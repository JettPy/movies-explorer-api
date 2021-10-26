const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../utils/HttpError');
const { UNAUTHORIZED_LOGIN } = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new HttpError(401, UNAUTHORIZED_LOGIN));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new HttpError(401, UNAUTHORIZED_LOGIN));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
