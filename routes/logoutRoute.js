const logoutController = require("../controller/logoutController");
const express = require("express");
const router = express.Router();

router.get("/logout", logoutController.logout);


module.exports = router;