const Product = require('../model/product');
const User = require('../model/user');
const Cart = require('../model/cart');

exports.addToCart = async (req, res) => {
  const { productId, name, price } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const subtotal = price * quantity;
  totalPrice = 0;
  let newtotal = subtotal;
  let totalSum = 0;
  //console.log(quantity);
  let cart = await Cart.findOne({ userId });
  try {
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;

        cart.products[itemIndex].subtotal =
          cart.products[itemIndex].quantity * price;

        for (let i = 0; i < cart.products.length; i++) {
          totalSum += cart.products[i].subtotal;
          cart.totalPrice = totalSum;
          // console.log(totalSum);
        }
      } else {
        cart.products.push({ productId, quantity, name, price, subtotal });
        for (let i = 0; i < cart.products.length; i++) {
          totalSum += cart.products[i].subtotal;
          cart.totalPrice = totalSum;
          // console.log(totalSum);
        }
      }

      cart = await cart.save();
      req.flash('success_msg', 'Product added to cart');
      res.redirect('/products');
    } else {
      await Cart.create({
        userId,
        products: [{ productId, quantity, name, price, subtotal }],
        totalPrice: newtotal,
      });
      let cart = await Cart.findOne({ userId });
      for (let i = 0; i < cart.products.length; i++) {
        newtotal += cart.products[i].subtotal;
        cart.totalPrice = newtotal;
        // console.log(totalSum);
      }
      req.flash('success_msg', 'Product added to cart');
      res.redirect('/products');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

exports.showShoppingCart = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  try {
    const cart = await Cart.findOne({ userId }).populate('userId');

    res.render('cart.ejs', {
      cartItems: cart.products,
      user: req.user.user,
      totalPrice: cart.totalPrice,
    });
  } catch (err) {
    console.log(err.message);
    req.flash('warning_msg', 'Your cart is empty');
    res.redirect('back');
  }
};

exports.removeCartProduct = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: req.user.user._id });
  const userId = user;
  const cart = await Cart.findOne({ userId });

  const { price } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const subtotal = price * quantity;
  totalPrice = 0;
  let totalSum = 0;

  try {
    Cart.findByIdAndRemove(id, (err) => {
      cart.products.pull({ _id: id });

      for (let i = 0; i < cart.products.length; i++) {
        console.log(cart.products.length);
        totalSum += cart.products[i].subtotal;
        cart.totalPrice = totalSum;
      }
      if (cart.products == '') {
        cart.totalPrice = totalSum;
      }
      cart.save();
      if (err) return res.send(500, err);
      req.flash('success_msg', 'Product removed from cart');
      res.redirect('/showShoppingCart');
    });
  } catch (err) {
    res.redirect('/showShoppingCart');
  }
};
