const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");
const { connectionModel } = require("../model/connectionRequest.js");

connectionRouter.post(
  "/reuest/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        res.json({
          message: "requested status is not valid",
        });
        return;
      } else {
        const connnetionReq = new connectionModel({
          fromUserId,
          toUserId,
          status,
        });
        const data = await connnetionReq.save();
        res.json({
          message: "Connection request send",
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
connectionRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const reqId = req.params.requestId;
    const status = req.params.status;
    const allowedStatus = ["accept", "reject"];
    try {
      if (!allowedStatus.includes(status)) {
        res.json({
          message: "requested status is not valid",
        });
        return;
      }else{
        const connectionReq=new connectionModel({
          reqId,
          status
        });
        const data = await connnetionReq.save();
        res.json({
          message: "Connection request send",
          data,
        });
      }
    } catch (error) {
      console.log(error);
      req.json({
        "message":"Error reviewing the request"
      })
    }
  }
);

module.exports = { connectionRouter };
