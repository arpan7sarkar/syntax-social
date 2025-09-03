const { isEmail, isStrongPassword } = require("validator");

const validateUser = (req) => {
  const { fName, lName, emailId, password, age, skills } = req.body;
  if (!fName || !lName) {
    throw new Error("Please provide the first and last name");
  } else if (!isEmail(emailId)) {
    throw new Error("Fix your email adress");
  } else if (!isStrongPassword(password)) {
    throw new Error("Please write a strong password");
  } else if (age < 16) {
    throw new Error("You need to be at least 16 to open this app");
  } else if (skills.length < 5 || skills.length > 15) {
    throw new Error(
      "You at least need to add 5 skills and you can add upto 15 skils"
    );
  }
};
const validForEdit =async (req) => {
  const editable = [
    "fName",
    "lName",
    "age",
    "gender",
    "skills",
    "about",
    "photoUrl"
  ];
  const isEditable = await Object.keys(req.body).every((field) => {
    editable.includes(field)
  });
  return isEditable;
};
module.exports = { validateUser, validForEdit };
