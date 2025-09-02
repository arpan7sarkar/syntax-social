const mongoose = require("mongoose");
const validate = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      minlength: 3,
      required: true,
    },
    lName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
    age: { type: Number },
    gender: {
      type: String,
      validate(value) {
        if (value.toLowerCase() != ("male" || "female" || "other")) {
          throw new Error("NOt a valide gender chose widely ");
        }
      },
    },
    photoUrl: { type: String },
    about: {
      type: String,
      default: "Hey there I am using Syntax social",
      minlength: 20,
    },
    skills: { type: [String] },
  },
  {
    timestamps: true, //this will add the timestamp (created at and updated at)when the user is signed up
  }
);
//create JWT token schema
userSchema.methods.getJWT=async function() {
    return token=await jwt.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:'1h'})
}
userSchema.methods.validatePassword=async function(password){
    return ispassValid = await bcrypt.compare(password, this.password);
}
const userModel = mongoose.model("users", userSchema);
module.exports = { userModel };
