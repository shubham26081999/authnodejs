const jwt = require('jsonwebtoken');
const Register = require("../models/registers");

const auth = async(req,res,next)=>{
      try{
        const token = req.cookies.jwt;
        const verifyUser =jwt.verify(token,"mynameisshubhamvivekpithadialearner")
        console.log(verifyUser);

        const user = Register.find({_id:verifyUser._id})
        console.log(user)
        next();

      }catch(err){
        res.status(401).send(err.message)
      }

}
module.exports = auth;
