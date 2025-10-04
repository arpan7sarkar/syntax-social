const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",//this will link this db collection to user collection
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "interested", "accepeted", "rejected"],
      message: `{Value} is incorrect status type`,
    },
  },
});
// This method will be called before every save
connectionRequestSchema.pre("save",function (next){
  const connectionRequest=this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You can't send connection request to yourself");
  }
  next();
})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });//compound index for fast search  
const connectionModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
module.exports = { connectionModel };
