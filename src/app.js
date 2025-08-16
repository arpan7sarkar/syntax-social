console.log("Starting a new project");
const express=require('express');
const app=express();
// app.use("/routeName",(req,res)=>{
//     res.send("Hello from server");//server is responsing
// })

//example use case of routes

// app.get('/ab?c',(req,res)=>{
//     res.send("Here the url may or may not have b but it will still gonna work");
// })
// app.get("/ab+c",(req,res)=>{
//     res.send("Here we can write as much b we want in between a and c");
// })
// app.get("/ab*c",(req,res)=>{
//     res.send("Here can write anything in between ab and c still the url will work");
// })
// app.get("/(ab)?c",(req,res)=>{
//     res.send("Here the url may or may not need ab ");
// })
// app.get("/abc",(req,res)=>{
//     res.send("this is a normal route");
// })


// app.get(/a/,(req,res)=>{// here a is a regex this means if in any url there exist at least one a then that url will take you into this route
//     res.send("You have the word 'a' in your url");
// })

//in the industry we dont use app.use cause in this format get/post/put/delete all works same so we use app.get

//
app.get('/*fly$',(req,res)=>{
    res.send("This url ends with fly");
})
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

