const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true}
})

const Product = mongoose.model("product", productSchema)

module.exports = Product;