const {addProductForm, addProductFormSubmit, showProducts, showAdminProducts} = require("../controller/adminController");

const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/addProduct", verifyAdmin, addProductForm);
router.post("/addProduct", verifyAdmin, addProductFormSubmit);
router.get("/showProducts", verifyUser, showProducts);
router.get("/showProducts", verifyAdmin, showProducts);
router.get("/showAdminProducts", verifyAdmin, showAdminProducts);

module.exports = router;