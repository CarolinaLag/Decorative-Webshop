const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const paymentController = require('../controller/paymentController');

router.get('/checkout', verifyUser, paymentController.checkout);
router.get('/shoppingSuccess', verifyUser, paymentController.shoppingSuccess);

module.exports = router;
