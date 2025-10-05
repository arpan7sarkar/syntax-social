const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth");
const { connectionModel } = require("../model/connectionRequest");
const USER_PUBLIC_DATA = "fName lName photoUrl about age";
const { userModel } = require("../model/user.js");
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const request = await connectionModel
      .find({
        toUserId: loggedinUserId,
        status: "interested",
      })
      .populate("fromUserId", USER_PUBLIC_DATA); //after adding ref in a model, we can use populate here that means we can use populate to get their data
    //always remember to restrict populate else your important data will be exposed

    // .populate("fromUserId",["fName","lName"]); we can also write populate in this way

    const data = request.map((item) => item.fromUserId);
    res.json({
      message: "Data feched succesfully\n",
      data,
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
    const myConnection = await connectionModel
      .find({
        $or: [
          { toUserId: loggedinUser._id, status: "accepted" },
          { fromUserId: loggedinUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_PUBLIC_DATA)
      .populate("toUserId", USER_PUBLIC_DATA);
    const data = myConnection.map((item) => {
      if (item.fromUserId.toString === loggedinUser._id.toString()) {
        return item.toUserId;
      }
      return item.fromUserId;
    });
    res.json({
      message: "Your connnection requests are",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "facing some issues",
    });
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  // query : /feed?page=1&limit=10 after question mark what we write is a query
  try {
    const loggedinUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit= limit>50?50:limit;
    const skip = (page - 1) * limit;

    const connections = await connectionModel
      .find({
        $or: [{ toUserId: loggedinUser._id }, { fromUserId: loggedinUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUserFromFeed = new set();
    connections.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await userModel
      .find({
        $and: [
          { _id: { $nin: Array.from(hideUserFromFeed) } }, //nin menas not in this
          { _id: { $ne: loggedinUser._id } }, //ne means not be equal to
        ],
      })
      .select(USER_PUBLIC_DATA)
      .skip(skip)//skip & limit is inbuild fn in mongo db that limits and skips 
      .limit(limit);
  } catch (error) {
    res.status(400).json({
      message: "Facing some errors here",
      error: error.message,
    });
  }
});
module.exports = { userRouter };
