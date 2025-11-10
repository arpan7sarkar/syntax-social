const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");
const { connectionModel } = require("../model/connectionRequest.js");
const { default: mongoose, Connection } = require("mongoose");
const { userModel } = require("../model/user");
connectionRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];
      const toUser = await userModel.findById(toUserId);
      const existingReq = await connectionModel.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (!allowedStatus.includes(status)) {
        res.json({
          message: "requested status is not valid",
        });
        return;
      } else if (!toUser) {
        res.status(404).json({
          message: "User not found",
        });
      } else if (existingReq) {
        res.status(400).json({
          message: "You have already sent a request",
          data: existingReq,
        });
      } else {
        const connnetionReq = new connectionModel({
          fromUserId,
          toUserId,
          status,
        });
        const data = await connnetionReq.save();
        res.json({
          message: req.user.fName + " is " + status + " to " + toUser.fName,
          data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Facing some erros");
    }
  }
);
connectionRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    //Loggedin shoudl be toUser of send connection request
    try {
      const {requestId,status} = req.params;
      const loggedinUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status is not allowed!",
        });
      }
      //send/previous status must be interested
      //request id should be valid
      const connectionRequest =await connectionModel.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(404).json({
          message: "No connection request found!",
        });
      }
      connectionRequest.status = status;
      const data =await connectionRequest.save();
      res.json({
        message: "Connection request has been ",
        data
      });
    } catch (error) {
      console.log(error)
      res.status(400).send("Facing some erros"+error);
    }
  }
);

module.exports = { connectionRouter };
