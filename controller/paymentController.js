const User = require('../model/user');
const Cart = require('../model/cart');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
var sgTransport = require('nodemailer-sendgrid-transport');

const checkout = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });

  try {
    if (!cart.products || cart.products.length <= 0) {
      req.flash('warning_msg', 'Your cart is empty.');
      return res.redirect('/products');
    }

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:8000/shoppingSuccess',
      cancel_url: 'http://localhost:8000/checkout',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: cart.products.map((product) => {
        return {
          name: product.name,
          amount: product.price * 100,
          quantity: product.quantity,
          currency: 'sek',
        };
      }),
      mode: 'payment',
    });
    res.render('checkout.ejs', {
      cartItems: cart.products,
      totalPrice: cart.totalPrice,
      sessionId: session.id,
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
};

var transport = nodemailer.createTransport(sgTransport(options));

const shoppingSuccess = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });
  try {
    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();
    res.render('successMessage.ejs', {
      user: user,
    });

    await transport.sendMail({
      from: process.env.USER,
      to: user.email,
      subject: 'Purchase confirmation',
      html: `<h2>Thank you for shopping at Decorative, your items are on the way. </h2>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkout,
  shoppingSuccess,
};
