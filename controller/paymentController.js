const User = require("../model/user");
const Cart = require("../model/cart");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });
  console.log(cart);

  try {
    if (!cart.products || cart.products.length <= 0)
      return res.redirect("/products");
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:8000/shoppingSuccess",
      cancel_url: "http://localhost:8000/checkout",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: cart.products.map((product) => {
        return {
          name: product.name,
          amount: product.price * 100,
          quantity: product.quantity,
          currency: "sek",
        };
      }),
      mode: "payment",
    });
    res.render("checkout.ejs", {
      cartItems: cart.products,
      totalPrice: cart.totalPrice,
      sessionId: session.id,
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const shoppingSuccess = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });
  try {
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();
    res.render("successMessage.ejs", {
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkout,
  shoppingSuccess,
};
