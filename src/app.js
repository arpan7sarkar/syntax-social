console.log("Starting a new project");
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const cors= require("cors");
// Always remeber to use‼️await‼️‼️
// Normalize configured frontend URL (strip trailing slash(es)) and
// validate incoming request origin so the header exactly matches.
const configuredFrontendUrl = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.replace(/\/+$/, "")
  : "";
app.use(
  cors({
    origin: (requestOrigin, callback) => {
      // Allow non-browser requests (like curl, server-to-server) with no origin
      if (!requestOrigin) return callback(null, true);
      const normalizedIncoming = requestOrigin.replace(/\/+$/, "");
      if (configuredFrontendUrl && normalizedIncoming === configuredFrontendUrl) {
        return callback(null, true);
      }
      // Not allowed by CORS
      return callback(new Error("CORS policy: origin not allowed"), false);
    },
    credentials: true,
  })
);
app.use(express.json());
const {authRouter,profileRouter,connectionRouter,userRouter}=require("./routers/index.route.js");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);


connectDB()
  .then(() => {
    console.log("MongoDb setup done");
    app.listen(process.env.PORT || 7777, () => {
      console.log(
        `server has been succesfullly listening at http://localhost:${process.env.PORT || 7777}/`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
//give port here
