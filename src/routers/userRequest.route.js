const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth");
const { connectionModel } = require("../model/connectionRequest");

userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const request = await connectionModel
      .find({
        toUserId: loggedinUserId,
        status: "interested",
      })
      .populate("fromUserId", "fName lName photoUrl about age"); //after adding ref in a model, we can use populate here that means we can use populate to get their data
    //always remember to restrict populate else your important data will be exposed

    // .populate("fromUserId",["fName","lName"]); we can also write populate in this way
    res.json({
      message: "Data feched succesfully\n",
      data: request,
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
    const loggedinUserId = req.user._id;
    const connections = connectionModel.find({
      $or: [
        { toUserId: loggedinUserId, status: "accepted" },
        { fromUserId: loggedinUserId, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", "fName lName photoUrl about age");
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "facing some issues",
    });
  }
});
module.exports = { userRouter };
