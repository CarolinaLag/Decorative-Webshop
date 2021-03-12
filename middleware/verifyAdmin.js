const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyTokenAdmin = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) return res.render("login.ejs", { err: "You have to log in" });

  const validUser = jwt.verify(token, process.env.SECRET_JWT_KEY);

  if(!validUser.user.role) return res.render("login.ejs", {err: "You dont have permission"})

    req.user = validUser;
  
  next();
};

module.exports = verifyTokenAdmin;