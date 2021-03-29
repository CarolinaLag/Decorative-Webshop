const handleProducts = require('../controller/handleProducts');
const express = require('express');
const router = express.Router();
router.get('/products', handleProducts.renderProducts);

module.exports = router;
