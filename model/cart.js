const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: String,
      quantity: { type: Number, min: [1] },
      name: String,
      price: Number,
      subtotal: { type: Number, default: 0 },
    },
  ],
  totalPrice: { type: Number },
});

//price x quantity

module.exports = mongoose.model("Cart", CartSchema);
