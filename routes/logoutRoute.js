const logoutController = require("../controller/logoutController");
const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/logout", verifyUser, logoutController.logout);


module.exports = router;