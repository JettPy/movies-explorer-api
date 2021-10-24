const router = require('express').Router();
const { updateUserValidator } = require('../middlewares/validator');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
