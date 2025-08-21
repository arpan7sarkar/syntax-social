console.log("Starting a new project");
require("dotenv").config();
const express=require('express');
const {connectDB}=require("./config/database.js");
const {userModel}=require("./model/user.js");
const app=express();

app.use(express.json());

const {userVerification,adminVerification}=require("./utils/index.js");
app.post("/signup",async (req,res)=>{
    // const user =new userModel({
    //     fName:"Shakal",
    //     lName:"Khiladi",
    //     emailId:"Shaku@gmaill.com",
    //     password:"theOnePiece",
    //     age:106
    // })
    const user=new userModel(req.body);
    
    try {
        await user.save();
        res.send("New user had been created")
    } catch (error) {
        res.status(400).send("The user is not saved" + error);
    }
})
connectDB().then(()=>{
    console.log("MongoDb setup done");
    app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
});
}).catch((err)=>{
    console.log(err)
})



//give port here

