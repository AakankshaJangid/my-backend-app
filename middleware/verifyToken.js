const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5ODUyNDIyMCwiaWF0IjoxNjk4NTI0MjIwfQ.opQ384cBYoT_i6WIJpQ-OwLoscvYlnO8M5U1jIwSz-Q";


const verifyToken = asyncHandler(async(req, res , next) => {
    let token = req.headers.authorization;
        jwt.verify(token,jwtSecret,(err , decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not athorized");
            }
            req.user = decoded;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("Access denied");
        }
})

module.exports = verifyToken;