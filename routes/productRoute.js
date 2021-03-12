const handleProducts = require("../controller/handleProducts");
const express = require("express");
const router = express.Router();

router.get("/products", handleProducts.renderProducts);

router.post("/products", function (req, res) {
  const show_modal = req.body.modal;
  console.log(req.body.modal);
  res.render("productView.ejs", { show_modal });
});

module.exports = router;
