const express = require("express");
const router = express.Router();
const {loginRender, loginSubmit} = require("../controller/loginController");

router.get("/login", loginRender);

router.post("/login", loginSubmit);

module.exports = router;