const Product = require("../model/product");
const User = require("../model/user");

exports.addToCart = async (req, res) => {
  const productID = req.params.id;
  const user = await User.findOne({ _id: req.user.user._id });
  user.addToCart(productID);
  const userProductData = await User.findOne({
    _id: req.user.user._id,
  }).populate("cartList");
  res.render("cart.ejs", { cartItems: userProductData.cartList });
};
