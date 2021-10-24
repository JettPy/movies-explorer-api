const { celebrate, Joi } = require('celebrate');

module.exports.registrationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.saveMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    trailer: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    thumbnail: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});
