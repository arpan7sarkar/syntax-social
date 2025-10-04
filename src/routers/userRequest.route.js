const express=require("express");
const userRouter=express.Router();
const { userAuth } = require("../utils/middlewares/auth");
const { connectionModel } = require("../model/connectionRequest");

userRouter.get("/user/request/recived",userAuth,async (req,res)=>{
    try {
        const loggedinUserId=req.user._id;
        const request = await connectionModel.find({
            toUserId:loggedinUserId,
            status:"interested"
        })
        res.json({
            message:"Data feched succesfully\n",
            data:request,
        })

    } catch (error) {
        console.log(error);
        res.json({
            message:"Facing error!"+error.message,
            
        })

    }
})

module.exports={userRouter};