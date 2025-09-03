const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../utils/middlewares/auth.js");
const { userModel } = require("../model/user.js");
const {validuser,validForEdit}=require("../utils/validation.js")
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Please relogin" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!(validForEdit(req))) {
      throw new Error("Enter valid editable fields");
    } else {
      const user = req.user;
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      await user.save();
      res.send("User updated succesfull");
    }
  } catch (error) {
    console.log("Error " + error);
    res.status(400).send("Error " + error);
  }
});


module.exports = { profileRouter };
