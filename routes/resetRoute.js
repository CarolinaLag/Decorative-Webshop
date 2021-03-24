const express = require('express');
const router = express.Router();
const resetPassController = require('../controller/resetPassController');

router.get('/reset', resetPassController.resetRender);

router.post('/reset', resetPassController.resetSubmit);

router.get('/reset/:token', resetPassController.resetParams);

router.post('/resetForm', resetPassController.resetFormSubmit);

module.exports = router;
