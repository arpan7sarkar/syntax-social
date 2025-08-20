const {adminVerification,userVerification}=require("./middlewares/isVerified");
const {connectDB}=require("../config/database.js")
module.exports={adminVerification,userVerification,connectDB};