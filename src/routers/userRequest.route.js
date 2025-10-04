const express=require("express");
const userRouter=express.Router();
const {userModel}=require("../model/user.js");
const { userAuth } = require("../utils/middlewares/auth");
const { connectionModel } = require("../model/connectionRequest");

userRouter.get("/user/request/recived",userAuth,async (req,res)=>{
    try {
        const loggedinUserId=req.user._id;
        const request=connectionModel.find({
            toUserId:loggedinUserId,
            status:"interested"
        })
        res.json({
            message:"Data feched succesfully",
            data:request
        })

    } catch (error) {
        res.json({
            message:"Facing error!",
            error:error
        })

    }
})

module.exports={userRouter};