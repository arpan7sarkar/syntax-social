const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    minlength: 3,
    required: true,
  },
  lName: {
    type: String,
  },
  emailId: { type: String, required: true , unique:true,lowercase:true,trim:true,},
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String ,validate(value){
    if(value.toLowerCase()!=("male"||"female"||"other")){
        throw new Error("NOt a valide gender chose widely ");
    }
  }},
  photoUrl:{type:String},
  about:{type:String,default:"Hey there I am using Syntax social"},
  skills:{type:[String]}
},{
    timestamps:true//this will add the timestamp (created at and updated at)when the user is signed up 
});
const userModel = mongoose.model("sser", userSchema);
module.exports = { userModel };