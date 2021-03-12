const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")

router.get("/login", loginController.loginRender);

router.post("/login", loginController.loginSubmit);


module.exports = router;
