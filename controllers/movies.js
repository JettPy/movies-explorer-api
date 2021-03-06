const Movie = require('../models/movie');
const HttpError = require('../utils/HttpError');
const { MOVIE_NOT_FOUND, FORBIDDEN } = require('../utils/messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new HttpError(404, MOVIE_NOT_FOUND))
    .populate(['owner'])
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id.toString()) {
        movie.remove()
          .then((delitedMovie) => res.send(delitedMovie))
          .catch(next);
      } else {
        throw new HttpError(403, FORBIDDEN);
      }
    })
    .catch(next);
};
