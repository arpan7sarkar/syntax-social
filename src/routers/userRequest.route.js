const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth");
const { connectionModel } = require("../model/connectionRequest");
const USER_PUBLIC_DATA= "fName lName photoUrl about age";
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const request = await connectionModel
      .find({
        toUserId: loggedinUserId,
        status: "interested",
      })
      .populate("fromUserId",USER_PUBLIC_DATA); //after adding ref in a model, we can use populate here that means we can use populate to get their data
    //always remember to restrict populate else your important data will be exposed

    // .populate("fromUserId",["fName","lName"]); we can also write populate in this way

    const data=request.map((item)=>item.fromUserId);
    res.json({
      message: "Data feched succesfully\n",
      data
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Facing error!" + error.message,
    });
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const myConnection =await connectionModel.find({
      $or: [
        { toUserId: loggedinUser._id, status: "accepted" },
        { fromUserId: loggedinUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_PUBLIC_DATA);
    const data=myConnection.map((item)=>item.fromUserId);
    res.json({
      message:"Your connnection requests are",data
      
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "facing some issues",
    });
  }
});
module.exports = { userRouter };
