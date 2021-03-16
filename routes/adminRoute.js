const {addProductForm, addProductFormSubmit, showProducts, showAdminProducts, removeProduct, editProduct, postEdit} = require("../controller/adminController");

const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/addProduct", verifyAdmin, addProductForm);
router.post("/addProduct", verifyAdmin, addProductFormSubmit);
router.get("/products", verifyUser, verifyAdmin, showProducts);
router.get("/addProduct", verifyAdmin, showAdminProducts);
router.get("/addProduct/remove/:id", verifyAdmin, removeProduct);
router.get("/addProduct/edit/:id", verifyAdmin, editProduct)
router.post("/addProduct/edit/:id", verifyAdmin, postEdit)

module.exports = router;