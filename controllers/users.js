const User = require('../models/user');
const HttpError = require('../utils/HttpError');
const { USER_NOT_FOUND } = require('../utils/messages');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new HttpError(404, USER_NOT_FOUND))
    .then((user) => res.status(200).send(user))
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
    .then((user) => res.status(200).send(user))
    .catch(next);
};
