const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  token: String,
  tokenExpiration: Date,

  cartList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],

  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

userSchema.methods.addProductList = function (productId) {
  this.productList.push(productId);
  this.save();
};

userSchema.methods.addToCart = async function (productId) {
  this.cartList.push(productId);

  await this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };

  return this.save();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
