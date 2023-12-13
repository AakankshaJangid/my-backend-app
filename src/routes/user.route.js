const verifyToken = require('../../middleware/verifyToken');
const user = require('../controller/user.controller');
const router = require('express').Router();

// To create a user
router.post('/user', user.create);

//To get all users
router.get('/all-users', user.getAllUsers);

//To get individual user
router.get('/:id',user.getUser);

//To update user details
router.put('/:id',user.updateUser);

//To delete user
router.delete('/:id',user.deleteUser);

//To Login user
router.post('/login',user.loginUser);

//To get current user
router.get('/current',verifyToken,user.getCurrentUser)

module.exports = router;