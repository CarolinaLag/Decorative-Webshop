const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRender = (req, res) => {

  res.render("login.ejs", { err: " " });
};

const loginSubmit = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (email == "" || password == "") {
      return res.render("login.ejs", { err: "All fields are required" });
    }
    if (!user) return res.render("login.ejs", { err: "User is not valid" });

    const validUser = await bcrypt.compare(password, user.password);
    console.log(validUser);

    if (!validUser)
      return res.render("login.ejs", { err: "Password is not valid" });

    const jwtToken = await jwt.sign({ user: user }, process.env.SECRET_JWT_KEY);

    if (jwtToken) {
      const cookie = req.cookies.jwtToken;

      if (!cookie) {
        res.cookie("jwtToken", jwtToken, { maxAge: 360000000, httpOnly: true });
      }
      return res.redirect("/");
    }
  } catch (err) {
    res.render("login.ejs", { err: err });
  }
};

module.exports = {
  loginRender,
  loginSubmit,
};
