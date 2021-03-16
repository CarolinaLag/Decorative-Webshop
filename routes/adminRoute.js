const {
  addProductForm,
  addProductFormSubmit,
  showProducts,
  showAdminProducts,
  removeProduct,
  editProduct,
  postEdit,
} = require("../controller/adminController");

const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(console.log(new Error("Wrong file type")));
    }
    callback(null, true);
  },
});

router.get("/addProduct", verifyAdmin, addProductForm);
router.post(
  "/addProduct",
  verifyAdmin,
  upload.single("image"),
  addProductFormSubmit
);
router.get("/products", verifyUser, verifyAdmin, showProducts);
router.get("/addProduct", verifyAdmin, showAdminProducts);
router.get("/addProduct/remove/:id", verifyAdmin, removeProduct);
router.get("/addProduct/edit/:id", verifyAdmin, editProduct);
router.post("/addProduct/edit/:id", verifyAdmin, postEdit);

module.exports = router;
