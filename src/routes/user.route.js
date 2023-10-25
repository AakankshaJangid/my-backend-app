const user = require('../controller/user.controller');
const router = require('express').Router();

// To create a user
router.post('/user', user.create);

// To login a user using passport local strategy
router.post('/user-passport-login', user.loginWithPassport);

module.exports = router;