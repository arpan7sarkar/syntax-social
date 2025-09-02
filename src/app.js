console.log("Starting a new project");
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database.js");
const { userModel } = require("./model/user.js");
const app = express();
const { userVerification, adminVerification } = require("./utils/index.js");
const { validateUser } = require("./utils/validation.js");
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

    const ispassValid = await bcrypt.compare(password, user.password);
    const jwtTOken = await jwt.sign({ _id: user._id }, "MyJwtSecret@arpan");
    // console.log(jwtTOken);

    if (ispassValid) {
      res.cookie("token", jwtTOken);
      res.send("Login succesfull");
    } else {
      throw new Error("Invalid credintials");
    }
  } catch (error) {
    res.status(400).send("Invalid user details");
  }
});
app.get("/profile",userAuth, async (req, res) => {
  try {
    // const cookie = req.cookies;
    // const { token } = cookie;
    // const decoded = await jwt.verify(token, "MyJwtSecret@arpan");
    // const { _id } = decoded;
    // const user = await userModel.findById(_id);
   const user=req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Please relogin" + error);
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

app.patch("/user/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const allowedUpdates = [
      "_id",
      "fName",
      "lName",
      "password",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(req.body).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed for these vlaues");
    }
    if (req.body?.skills?.length > 5) {
      throw new Error("You can't add more than 5 skills");
    }
    await userModel.findByIdAndUpdate(
      id,
      req.body,
      (runValidator = "true" && !id)
    ); //without runValidator the validation schemas will not gonna work here
    res.send("Id has succesfully updated");
  } catch (error) {
    res.status(400).send("Update failed " + error.message);
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
