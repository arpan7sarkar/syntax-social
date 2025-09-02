require("dotenv").config();
const { userModel } = require("../../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    //get the token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Something went wrong Please relogin ");
      //token not found
    }
    //validate the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Something went wrong Please relogin ");
      //Token is wrong
    }
    const { _id } = decoded;
    //get the usera
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("Something went wrong Please relogin ");
      //user not found
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  userAuth,
};
