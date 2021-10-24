const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
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
}), saveMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
