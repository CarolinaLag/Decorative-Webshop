const handleProducts = require("../controller/handleProducts");
const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
router.get("/products", verifyUser, handleProducts.renderProducts);

module.exports = router;
