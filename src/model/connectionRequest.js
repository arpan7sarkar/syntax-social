const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
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
// connectionRequestSchema.pre("save",function (next){
//   const connectionRequest=this;
//   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//     throw new Error("You can't send connection request to yourself");
    
//   }
//   next();
// })
const connectionModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
module.exports = { connectionModel };
