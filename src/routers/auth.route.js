const express = require("express");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

const { userModel } = require("../model/user.js");
const { validateUser } = require("../utils/validation.js");
const { userAuth } = require("../utils/middlewares/auth.js");
authRouter.use(cookieParser());
authRouter.post("/signup", async (req, res) => {
  const { fName, lName, emailId, password, age, skills, gender, about } =
    req.body;
  //validating the user given datas
  validateUser(req);
  //used bcrypt
  const passwordHash = await bcrypt.hash(password, 10); //encrypted the password
  // console.log(passwordHash);
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
    const jwtTOken = await user.getJWT(); //used user schema
      res.cookie("token", jwtTOken, {
        expires: new Date(Date.now() + 3600000),
      });
    res.json({ message: "New user had been created" ,user});
  } catch (error) {
    res.status(400).send("The user is not saved" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //checking if email id exists
    const user = await userModel.findOne({ emailId });
    if (!user) throw new Error("Invalid credintials "); //cant directly write that email does not exist or else hacker would get to know the details

    const ispassValid = await user.validatePassword(password); //used user schema

    if (ispassValid) {
      const jwtTOken = await user.getJWT(); //used user schema
      res.cookie("token", jwtTOken, {
        expires: new Date(Date.now() + 3600000),
      }); //added cookie expiry to 1 hr
      res.send(user);
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .send("Logout done"); //Used chaining method that is a good practice
  } catch (error) {
    console.log(error);
    res.status(400).send("Logout faild");
  }
});

module.exports = { authRouter };
