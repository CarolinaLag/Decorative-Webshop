const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/static", express.static("public"));

app.use("/", require("./routes/homeRoute"));

app.use("/", require("./routes/productRoute"));

app.use("/", require("./routes/loginRoute"));

app.use("/", require("./routes/registerRoute"));

app.use("/", require("./routes/resetRoute"));

app.use("/", require("./routes/adminRoute"));

app.use("/", require("./routes/logoutRoute"));

app.use("/", require("./routes/cartRoute"));
app.use("/", require("./routes/wishRoute"));

app.use("/", require("./routes/paymentRoute"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(process.env.DATABASE_URL, options, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(process.env.PORT || 8000, () => {
    console.log("App is running");
  });
});
