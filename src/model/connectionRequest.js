const mongoose = require("mongoose");
const connectionRequestSchema=mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignore", "interested", "accepeted", "rejected"],
                message:
                    `{Value} is incorrect status type`,
            },
        }
    }
);