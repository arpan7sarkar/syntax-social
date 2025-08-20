console.log("Starting a new project");
require("dotenv").config();
const express=require('express');
require("../config/database.js");
const app=express();
const {userVerification,adminVerification}=require("../utils/index.js");
//you can use multiple route handelrs at a time and here res.send works like return function (mostly but not purely true) next still works after using res.send (there are bugs nothing is sure here)
app.use("/hello",(req,res,next)=>{
    try {
        throw new Error("Checking try catch");
    } catch (error) {
        console.log(error);
        res.status(500).send("Here are some errors")
    }
})
app.use("/login",(req,res)=>{
    console.log("Hey user welcome to the login page");
    res.send("Enter your details");
})
app.use("/admin",adminVerification,(req,res)=>{
    console.log("Welcome to the admin pannel");
    res.send("THis is the admin pannel")
})

app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
    
});//give port here

