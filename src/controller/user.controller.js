const db = require('../models');
const User = db.user;
const passportLocal = require('../config/passportLocal')
const jwt = require('jsonwebtoken'); 
const uuid = require('uuid');

const jwtSecret = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5ODUyNDIyMCwiaWF0IjoxNjk4NTI0MjIwfQ.opQ384cBYoT_i6WIJpQ-OwLoscvYlnO8M5U1jIwSz-Q';

//to create a new user in db
function create(req,res){
    const uniqueId = uuid.v4();
    const userdata = {
        id: uniqueId,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: req.body.password,
    }
    User.create(userdata).then(data => {
        const token = jwt.sign({ userId: data.id }, jwtSecret, {
            expiresIn: '1h',
          });
    
          return res.send({
            msg: 'Registration Success',
            userdata:userdata,
            token: token, 
          });
    }).catch(err => {
        console.warn(err);
    })
}

//to login the user using passport
async function loginWithPassport(req,res){
    return await passportLocal.authenticate('local',function(err,user,info){
        if (err) {
            return res.send({ msg: 'Login Failed' });
          }
          if (!user) {
            return res.send({ msg: 'Login Failed' });
          }
          
          const token = jwt.sign({ userId: user.id }, jwtSecret, {
            expiresIn: '1h',
          });
      
          return res.send({
            msg: 'Login Success',
            token: token,
          });
    })(req,res)
}

// to get all users
function getAllUsers(req, res) {
    User.findAll()
      .then(users => {
        return res.send(users);
      })
      .catch(err => {
        console.warn(err);
        return res.status(500).send({ msg: 'Error retrieving users' });
      });
  }


module.exports = {
    create,
    loginWithPassport,
    getAllUsers
  };

