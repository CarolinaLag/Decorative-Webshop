const Product = require("../model/product");
const User = require("../model/user");
const Cart = require("../model/cart");

exports.addToCart = async (req, res) => {
  const { productId, quantity, name, price } = req.body;
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      // return res.status(201).send(cart);
      res.redirect("/showShoppingCart");
    } else {
      //no cart for user, create new cart
      await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }],
      });
      // return res.status(201).send(newCart);
      res.redirect("/showShoppingCart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.showShoppingCart = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  try {
    const cart = await Cart.findOne({ userId }).populate("userId");

    res.render("cart.ejs", {
      cartItems: cart.products,
      user: req.user.user,
      // totalAmount: cart.totalAmount,
    });
  } catch (err) {
    console.log(err);
  }
};
