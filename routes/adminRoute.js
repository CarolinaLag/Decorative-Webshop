const express = require('express');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const multer = require('multer');
const path = require('path');

const adminController = require('../controller/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(console.log(new Error('Wrong file type')));
    }
    callback(null, true);
  },
});

router.get('/addProduct', verifyAdmin, adminController.addProductForm);
router.post(
  '/addProduct',
  verifyAdmin,
  upload.single('image'),
  adminController.addProductFormSubmit
);
router.get('/products', verifyUser, verifyAdmin, adminController.showProducts);
router.get('/addProduct', verifyAdmin, adminController.showAdminProducts);
router.get(
  '/addProduct/remove/:id',
  verifyAdmin,
  adminController.removeProduct
);
router.get('/addProduct/edit/:id', verifyAdmin, adminController.editProduct);
router.post(
  '/addProduct/edit/:id',
  verifyAdmin,
  upload.single('image'),
  adminController.postEdit
);

module.exports = router;
