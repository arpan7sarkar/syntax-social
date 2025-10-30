console.log("Starting a new project");
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const cors= require("cors");
// Always remeber to use‼️await‼️‼️
app.use(cors());
app.use(express.json());
const {authRouter,profileRouter,connectionRouter,userRouter}=require("./routers/index.route.js");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);


connectDB()
  .then(() => {
    console.log("MongoDb setup done");
    app.listen(7777, () => {
      console.log(
        "server has been succesfullly listening at http://localhost:7777/"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
//give port here
