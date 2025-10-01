const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");
const { connectionModel } = require("../model/connectionRequest.js");
const { default: mongoose } = require("mongoose");
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
      }else if (!toUser) {
        res.status(404).json({
          message: "User not found",
        });
      } else if (existingReq) {
        res.status(400).json({
          message: "You have already sent a request",
          data: existingReq,
        });
      }  else {
        const connnetionReq = new connectionModel({
          fromUserId,
          toUserId,
          status,
        });
        const data = await connnetionReq.save();
        res.json({
          message: req.user.fName+" is "+status+" to "+toUser.fName,
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
    const reqId = req.params.requestId;
    const fromUserId = req.user._id;
    const toUserId = await connectionModel.findById(reqId).select("toUserId");
    const status = req.params.status;
    const allowedStatus = ["accepeted", "rejected"];
    try {
      if (!allowedStatus.includes(status)) {
        res.json({
          message: "requested status is not valid",
        });
        return;
      } else {
        const connectionReq = new connectionModel({
          fromUserId,
          toUserId,
          status,
        });
        const data = await connectionReq.save();
        res.json({
          message: "Connection request send",
          data,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.json({
        message: "Error reviewing the request",
      });
    }
  }
);

module.exports = { connectionRouter };
