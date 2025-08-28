console.log("Starting a new project");
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database.js");
const { userModel } = require("./model/user.js");
const app = express();
const { userVerification, adminVerification } = require("./utils/index.js");
app.use(express.json());
app.post("/signup", async (req, res) => {
  // const user =new userModel({
  //     fName:"Shakal",
  //     lName:"Khiladi",
  //     emailId:"Shaku@gmaill.com",
  //     password:"theOnePiece",
  //     age:106
  // })
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send("New user had been created");
  } catch (error) {
    res.status(400).send("The user is not saved" + error);
  }
});
//getting a particuler user using their email address
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  const user = await userModel.find({ emailId: email });
  res.send(user);
});
app.delete("/user", async (req, res) => {
  const id = req.body._id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.send("user is succesfully deleted");
  } catch (error) {
    console.log(error);
  }
});

app.patch("/updateById", async (req, res) => {
  const id = req.body._id;
  try {
    await userModel.findByIdAndUpdate(id, req.body,runValidator="true");//without runValidator the validation schemas will not gonna work here
    res.send("Id has succesfully updated");
  } catch (error) {
    res.status(400).send("Update failed" + error.message);
  }
});
app.get("/userById", async (req, res) => {
  const id = req.body._id;
  const user = await userModel.findById(id);
  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("The is is not found ");
  }
});
//ALl the users from the db
app.get("/feed", async (req, res) => {
  const users = await userModel.find({}); //this will showcase all the users/documents that are avilable
  if (!users) {
    res.status(400).send("THere are no user ");
  } else {
    console.log("User found succesfully");
    res.send(users);
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
