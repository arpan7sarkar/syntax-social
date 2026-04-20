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

const validateSkills = (skills) => {
  if (!Array.isArray(skills)) return "Skills must be an array";
  if (skills.length > 20) return "You can add upto 20 skills";
  for (const raw of skills) {
    if (typeof raw !== "string") return "Each skill must be a string";
    const skill = raw.trim();
    if (!skill) return "Skill cannot be empty";
    if (skill.length > 30) return "Each skill must be at most 30 characters";
  }
  return null;
};
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({user});
    
  } catch (error) {
    res.status(400).send("Please relogin" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validForEdit(req)) {
      throw new Error("Enter valid editable fields");
    } else {
      if (Object.prototype.hasOwnProperty.call(req.body, "skills")) {
        const skillsError = validateSkills(req.body.skills);
        if (skillsError) {
          return res.status(400).send(skillsError);
        }
        // Normalize skills: trim and remove empties/duplicates
        const normalized = req.body.skills
          .map((s) => String(s).trim())
          .filter(Boolean);
        req.body.skills = Array.from(new Set(normalized));
      }

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
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    if (!currentPassword || !newPassword) {
      return res.status(400).send("currentPassword and newPassword are required");
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return res.status(400).send("Incorrect current password");
    }

    if (!validPass(newPassword)) {
      throw new Error("Your password is not strong");
    } else {
      const passwordHash = await bcrypt.hash(newPassword, 10);
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
