const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const wishListController = require('../controller/wishListController');

router.get('/wishlist', verifyUser, wishListController.wishListShow);
router.get('/wishlist/:id', verifyUser, wishListController.wishListAdd);

router.get('/wishlist/delete/:id', verifyUser, wishListController.deleteWish);

module.exports = router;
