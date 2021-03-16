const cartController = require("../controller/cartController");
const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/showShoppingCart", verifyUser, cartController.showShoppingCart);
router.post("/addToCart", verifyUser, cartController.addToCart);
router.get("/showShoppingCart/remove/:id", verifyAdmin, cartController.removeCartProduct);

module.exports = router;
