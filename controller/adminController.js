const path = require("path");
const fs = require("fs");
const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();

const addProductForm = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id }).populate(
    "productList"
  );

  res.render("productForm.ejs", {
    user: req.user.user,
    products: user.productList,
    err: " ",
  });
};

const addProductFormSubmit = async (req, res) => {
  const { name, description, price } = req.body;

  if (name == "" || description == "" || price == "") {
    return res.render("productForm.ejs", { err: "All fields are required" });
  }

  const product = await new Product({
    name: name,

    img: {
      data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
      contentType: "image",
    },

    description: description,
    price: price,
  }).save();

  const user = await User.findOne({ _id: req.user.user._id });

  user.addProductList(product._id);

  console.log(user);

  res.redirect("/addProduct");
};

const showAdminProducts = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id }).populate(
    "productList"
  );
  console.log(user.productList);

  res.render("productForm.ejs", { products: user.productList, err: " " });
};

const showProducts = async (req, res) => {
  const products = await Product.find();

  res.render("productView.ejs", { err: " ", products: products });
};

const removeProduct = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: req.user.user._id });

  try {
    Product.findByIdAndRemove(id, (err) => {
      user.productList.pull({ _id: id });
      user.save();
      if (err) return res.send(500, err);
      res.redirect("/addProduct");
    });
  } catch (err) {
    res.redirect("/addProduct");
  }
};

const editProduct = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: req.user.user._id });
  const adminProducts = await user.productList;

  try {
    let data = await Product.find({ _id: adminProducts });
    res.render("productEdit.ejs", {
      user: req.user.user,
      products: data,
      idProduct: id,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/addProduct");
  }
};

const postEdit = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndUpdate(id, {
      name: req.body.name,
      img: {
        data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
        contentType: "image",
      },
      description: req.body.description,
      price: req.body.price,
    });
    res.redirect("/addProduct");
  } catch (err) {
    console.log(err);
    res.redirect("/addProduct");
  }
};

module.exports = {
  addProductForm,
  addProductFormSubmit,
  showAdminProducts,
  showProducts,
  removeProduct,
  editProduct,
  postEdit,
};
