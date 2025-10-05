const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../utils/middlewares/auth.js");
const { userModel } = require("../model/user.js");
const {
  validuser,
  validForEdit,
  validPass,
} = require("../utils/validation.js");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({data:user});
  } catch (error) {
    res.status(400).send("Please relogin" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validForEdit(req)) {
      throw new Error("Enter valid editable fields");
    } else {
      const user = req.user;
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      await user.save();
      res.json({
        message: `${user.fName}'s profile had been updated`,
        data: user,
      });
    }
  } catch (error) {
    console.log("Error " + error);
    res.status(400).send("Error " + error);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;
    if (!validPass(password)) {
      throw new Error("Your password is not strong");
    } else {
      console.log(user.password);
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
      await user.save();
      res.json({message:"Password had succesfully been changed "});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error chagning passs");
  }
});

module.exports = { profileRouter };
