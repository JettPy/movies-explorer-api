const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const HttpError = require('../utils/HttpError');
const { PAGE_NOT_FOUND } = require('../utils/messages');

router.use('/users', users);
router.use('/movies', movies);

router.use('*', () => {
  throw new HttpError(404, PAGE_NOT_FOUND);
});

module.exports = router;
