console.log("Starting a new project");
const express=require('express');
const app=express();
//you can use multiple route handelrs at a time and here res.send works like return function (mostly but not purely true) next still works after using res.send (there are bugs nothing is sure here)
app.use("/hello",(req,res,next)=>{
    console.log("Hello from a post rquest");
    next();
},(req,res,next)=>{
    next();
    console.log("Hello 2 bro");
    next();
},(req,res,next)=>{
    res.send("Response is ending here");
},(req,res,next)=>{
    console.log("final console.log");
})

app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
    
});//give port here

