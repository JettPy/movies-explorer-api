const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}), updateUser);

module.exports = router;
