const db = require('../models');
const User = db.user;
const passportLocal = require('../config/passportLocal')

//to create a new user in db
function create(req,res){
    const userdata = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: req.body.password,
    }
    User.create(userdata).then(data => {
        return res.send(data)
    }).catch(err => {
        console.warn(err);
    })
}

//to login the user using passport
async function loginWithPassport(req,res){
    return await passportLocal.authenticate('local',function(err,response){
        if(response){
            return res.send({
                msg:"Login Success",
            })
        }
        if(!response){
            return res.send({
                msg: "Failed"
            })
        }
    })(req,res)
}

module.exports = {
    create,
    loginWithPassport,
  };

