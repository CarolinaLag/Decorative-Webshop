const Product = require("../model/product");

exports.renderProducts = async (req, res) => {
  const products = await Product.find({});

  res.render("productView.ejs", {
    products: products,
    user: req.user.user,
  });
};
