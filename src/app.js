console.log("Starting a new project");
const express = require("express");
const { connectDB } = require("./config/database.js");
const { env } = require("./config/env.js");
const app = express();
const cors= require("cors");
// Always remeber to use‼️await‼️‼️
// Normalize configured frontend URL (strip trailing slash(es)) and
// validate incoming request origin so the header exactly matches.
const configuredFrontendUrl = env.frontendUrl;
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
    app.listen(env.port, () => {
      console.log(
        `server has been succesfullly listening at http://localhost:${env.port}/`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
//give port here
