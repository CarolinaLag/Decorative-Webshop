const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

router.get("/register", registerController.registerRender_get);

router.post("/register", registerController.registerSubmit_post);

module.exports = router;
