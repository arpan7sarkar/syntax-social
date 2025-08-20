const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    fName:{type:String},
    lName:{
        type:String
    },
    emailId: {type:String},
    password:{type:String},
    age:{type:Number},
    gender:{type:String}
})