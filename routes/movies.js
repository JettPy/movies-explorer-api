const router = require('express').Router();

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', saveMovie);

router.delete('/:id', deleteMovie);

module.exports = router;
