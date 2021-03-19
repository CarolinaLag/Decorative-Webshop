const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const {
  checkout,
  shoppingSuccess,
} = require("../controller/paymentController");

router.get("/checkout", verifyUser, checkout);
router.get("/shoppingSuccess", verifyUser, shoppingSuccess);

module.exports = router;
