console.log("Starting a new project");
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database.js");
const { userModel } = require("./model/user.js");
const app = express();
const { userVerification, adminVerification } = require("./utils/index.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./utils/middlewares/auth.js");
// Always remeber to use‼️await‼️‼️ leura bara
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { fName, lName, emailId, password, age, skills, gender, about } =
    req.body;
  //validating the user given datas
  validateUser(req);
  //used bcrypt
  const passwordHash = await bcrypt.hash(password, 10); //encrypted the password
  console.log(passwordHash);

  const user = new userModel({
    fName,
    lName,
    emailId,
    password: passwordHash,
    age,
    skills,
  });

  try {
    await user.save();
    res.send("New user had been created");
  } catch (error) {
    res.status(400).send("The user is not saved" + error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //checking if email id exists
    const user = await userModel.findOne({ emailId });
    if (!user) throw new Error("Invalid credintials "); //cant directly write that email does not exist or else hacker would get to know the details

    const ispassValid = await user.validatePassword(password);//used user schema
    const jwtTOken = await user.getJWT();//used user schema

    if (ispassValid) {
      res.cookie("token", jwtTOken,{expires: new Date(Date.now() + 3600000)});//added cookie expiry to 1 hr
      res.send("Login succesfull");
    } else {
      throw new Error("Invalid credintials");
    }
  } catch (error) {
    res.status(400).send("Invalid user details");
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Please relogin" + error);
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending connection request");
  //I don't have my fronend ready so have to write dummy version
  try {
    res.send("Connection request is send");
  } catch (error) {
    console.log(error);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDb setup done");
    app.listen(7777, () => {
      console.log(
        "server has been succesfullly listening at http://localhost:7777/"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
//give port here
