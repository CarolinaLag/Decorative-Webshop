const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  token: String,
  tokenExpiration: Date,

  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
  ],

  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
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

userSchema.methods.addWish = async function (wishId, user) {
  for (i = 0; i < user.wishList.length; i++) {
    if (user.wishList[i] == wishId) return;
  }
  this.wishList.push(wishId);
  await this.save();
};

const User = mongoose.model('user', userSchema);

module.exports = User;
