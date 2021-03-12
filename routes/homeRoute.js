const homeController = require("../controller/homeController");
const express = require("express");
const router = express.Router();

router.get("/", homeController.homeRender);

module.exports = router;
