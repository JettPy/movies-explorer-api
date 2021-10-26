const router = require('express').Router();
const { registrationValidator, loginValidator } = require('../middlewares/validator');
const { registration, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const HttpError = require('../utils/HttpError');
const { PAGE_NOT_FOUND } = require('../utils/messages');

router.post('/signup', registrationValidator, registration);

router.post('/signin', loginValidator, login);

router.post('/signout', auth, logout);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use('*', auth, () => {
  throw new HttpError(404, PAGE_NOT_FOUND);
});

module.exports = router;
