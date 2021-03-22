const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  next();
});

app.use('/static', express.static('public'));
app.use('/', require('./routes/homeRoute'));
app.use('/', require('./routes/productRoute'));
app.use('/', require('./routes/loginRoute'));
app.use('/', require('./routes/registerRoute'));
app.use('/', require('./routes/resetRoute'));
app.use('/', require('./routes/adminRoute'));
app.use('/', require('./routes/logoutRoute'));
app.use('/', require('./routes/cartRoute'));
app.use('/', require('./routes/wishRoute'));
app.use('/', require('./routes/paymentRoute'));

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
    console.log('App is running');
  });
});
