const user = require('../controller/user.controller');
const router = require('express').Router();
const passportLocal = require('../config/passportLocal')

// To create a user
router.post('/user', user.create);

// To login a user using passport local strategy
router.post('/user-passport-login', user.loginWithPassport);

//To get all users
router.get('/all-users', user.getAllUsers);


module.exports = router;