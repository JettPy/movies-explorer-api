const router = require('express').Router();
const { saveMovieValidator, deleteMovieValidator } = require('../middlewares/validator');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', saveMovieValidator, saveMovie);

router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
