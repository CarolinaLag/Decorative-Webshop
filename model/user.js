const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String},
    token: String,
  tokenExpiration: Date,
  shoppingCart: [
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
})


userSchema.methods.addProductList = function (productId) {
  this.productList.push(productId);
  this.save();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
