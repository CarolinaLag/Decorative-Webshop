const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: String,
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
  totalAmount: { type: Number },
});

module.exports = mongoose.model("Cart", CartSchema);
