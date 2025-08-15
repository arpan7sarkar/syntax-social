console.log("Starting a new project");
const express=require('express');
const app=express();
// app.use("/routeName",(req,res)=>{
//     res.send("Hello from server");//server is responsing
// })

app.use("/test/2",(req,res)=>{
    res.send("Hello from test2");//server is responsing
})
app.use("/test",(req,res)=>{
    res.send("Hello from test");//server is responsing
})
app.use("/hello",(req,res)=>{
    res.send("Hello from World");//server is responsing
})
app.use("/routeName",(req,res)=>{
    res.send("Hello from server");//server is responsing
})
app.use("/",(req,res)=>{
    res.send("Hello from Homepage");//server is responsing
})
app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
    
});//give port here