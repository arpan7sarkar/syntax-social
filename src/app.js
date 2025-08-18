console.log("Starting a new project");
const express=require('express');
const app=express();
//you can use multiple route handelrs at a time
app.use("/hello",(req,res,next)=>{
    console.log("Hello from a post rquest");
    next();
},(req,res,next)=>{
    res.send("Response is ending here");
})

app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
    
});//give port here

