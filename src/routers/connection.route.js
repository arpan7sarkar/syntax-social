const express=require("express")
const connectionRouter=express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");
const {connectionModel}=require("../model/connectionRequest.js");

connectionRouter.post("/reuest/send/:status/:toUserId", userAuth, async (req, res) => {

  try {
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const connnetionReq=new connectionModel({
      fromUserId,
      toUserId,
      status,
    })
    const data=await connnetionReq.save();
    res.json({
      message:"Connection request send",
      data
    })
    

    
  } catch (error) {
    console.log(error);
  }
});


module.exports={connectionRouter};