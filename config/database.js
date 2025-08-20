const mongoose=require("mongoose");
require('dotenv').config();
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL);
}
connectDB().then(()=>{
    console.log("MongoDb setup done");
}).catch((err)=>{
    console.log(err)
})
