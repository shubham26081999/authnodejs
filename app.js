const express= require('express');
const app = express();
const path = require("path")
require("./db/conn")
const hbs = require("hbs")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const auth= require("./middleware/auth")

const Register = require("./models/registers");
const { request } = require('http');
app.set('views', path.join(__dirname, '../views'))
app.set("view engine","hbs");
app.get('/', (req, res) => {
    res.render("../views/index.hbs")

})
app.get('/register', (req, res) => {
    res.render("register")
});
app.get("/secret",auth, (req, res) => {
    res.render("secret")
});

app.get("/login", (req, res) => {
    res.render("login")
});


// new user registration form to databse
app.post('/register', async(req, res) => {
  try{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if(password === cpassword){
        const registerEmployee = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            age: req.body.age,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        })

// password hash, after fatch data and before saving



        const Registered =registerEmployee.save();

    }else{
        res.send("password not matching")
    }
  }
  catch{
            res.send(404)
  }
  })
  //login form
app.post("/login",async (req, res)=>{

    try{
        const email = req.body.email;
        const password = req.body.password;

        console.log(`${email} and ${password}`)
        const useremail=await Register.findOne({email:email})

        const isMatch = bcrypt.compare(password,useremail.password)
        if(isMatch){
            res.status(201).render("index")
        }else{
            res.send("pass not match"); 
        }
    }
    catch{
     res.status(400).send("invalid email")   
    }
})  


//create jwt tocken
const createToken=async() =>{
const token =await jwt.sign({_id:"63382882dadb2044a908bf82"},"mynameisshubhamvivekpithadialearner");
console.log(token,);

const userVer = await jwt.verify(token,"mynameisshubhamvivekpithadialearner");
console.log(userVer);
}
createToken();
app.listen(process.env.PORT || 9000, (req, res) => {
    console.log("listening on port 9000 " )
})