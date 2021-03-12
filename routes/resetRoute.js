const express = require("express");
const router = express.Router();

const { resetRender, resetSubmit, resetParams, resetFormSubmit} = require("../controller/resetPassController");

router.get("/reset", resetRender);

router.post("/reset", resetSubmit);

router.get("/reset/:token", resetParams);

router.post("/resetForm", resetFormSubmit);

module.exports = router;