const express=require("express")
const connectionRouter=express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");


connectionRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending connection request");
  //I don't have my fronend ready so have to write dummy version
  try {
    res.send("Connection request is send");
  } catch (error) {
    console.log(error);
  }
});


module.exports={connectionRouter};