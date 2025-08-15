console.log("Starting a new project");
const express=require('express');
const app=express();
// app.use("/routeName",(req,res)=>{
//     res.send("Hello from server");//server is responsing
// })

//in the industry we dont use app.use cause in this format get/post/put/delete all works same so we use app.get
app.get("/hello",(req,res)=>{
    res.send("Hello from a get rquest");
})
app.post("/hello",(req,res)=>{
    res.send("Hello from a post rquest");
})
app.patch("/hello",(req,res)=>{
    res.send("Hello from a patch rquest");
})
app.put("/hello",(req,res)=>{
    res.send("Hello from a put rquest");
})
app.delete("/hello",(req,res)=>{
    res.send("Hello from a delete rquest");
})


app.use("/test/2",(req,res)=>{
    res.send("Hello from test2");
})
app.use("/test",(req,res)=>{
    res.send("Hello from test");
})

app.use("/routeName",(req,res)=>{
    res.send("Hello from server");
})
app.use("/",(req,res)=>{
    res.send("Hello from Homepage");
})
app.listen(7777,()=>{
    console.log("server has been succesfullly listening at http://localhost:7777/");
    
});//give port here