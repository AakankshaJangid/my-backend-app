const passport = require('passport')
const LocalStratery = require('passport-local').Strategy
const db = require('../models')

passport.use(new LocalStratery({
    usernameField: 'username',
}, async function(username,password,done){
    return await db.user.findByPk(username).then(async data => {
        if(!data){
            return done(null,null)
        }

        await data.comparePassword(password,(err,userData)=>{
            return done(null,userData)
        }).catch(err => {throw err})
    })
}))

passport.serializeUser(function(user,cb){
    cb(null, user);
})

passport.deserializeUser(function(obj,cb){
    cb(null,obj)
})

module.exports = passport