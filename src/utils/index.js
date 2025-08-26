const {adminVerification,userVerification}=require("./middlewares/isVerified.js");
const {connectDB}=require("./../config/database.js")
module.exports={adminVerification,userVerification,connectDB};