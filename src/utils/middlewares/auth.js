require("dotenv").config();
const { userModel } = require("../../model/user");
const jwt = require("jsonwebtoken");


const userAuth = async (req, res, next) => {
  try {
    //get the token
    const { token } = req.cookies;
    if (!token) {
      //token not found
      return res.status(401).send("Please login first");
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
    res.status(400).send(error);
  }
};

module.exports = {
  userAuth,
};
