const mongoose = require("mongoose")
const emplyeeSchema =  new mongoose.Schema({
    firstname: {
        type:String,
        requireed:true
    },
    lastname: {
        type:String,
        requireed:true
    },
    email: {
        type:String,
        requireed:true,
        unique:true
    },
    gender:{
        type:String,
        require: true,
    },
    phone:{
        type:Number,
        require:true,
        unique:true,
    },
    age:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true,
    },

})
// dost use ()=> to create function it not suitable when we call .this
emplyeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
   // const passwordHash = await bcrypt.hash(password, 10);
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmpassword = undefined

    }
    next() 
})

//create a collection
const Register = new mongoose.model("Register",emplyeeSchema)
module.export = Register;