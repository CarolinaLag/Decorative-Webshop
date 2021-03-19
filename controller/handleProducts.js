const Product = require('../model/product');
const User = require('../model/user');

exports.renderProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const totalData = await Product.find().countDocuments();
  const taskPerReq = 2;
  const totalPages = Math.ceil(totalData / taskPerReq);
  const dataToShow = taskPerReq * page;
  const sorted = +req.query.sorted || 1;

  try {
    if (page === 1) {
      let products = await Product.find({})
        .limit(dataToShow)
        .sort({ price: sorted });
      res.render('productView.ejs', {
        products: products,
        currentPage: page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    } else {
      let products = await Product.find({})
        .limit(2)
        .skip((page - 1) * 2)
        .sort({ price: sorted });
      res.render('productView.ejs', {
        products: products,
        currentPage: page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    }
  } catch (err) {
    res.redirect('/');
  }
};
