const cartController = require("../controller/cartController");
const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/showShoppingCart", verifyUser, cartController.showShoppingCart);
router.post("/addToCart", verifyUser, cartController.addToCart);

module.exports = router;
