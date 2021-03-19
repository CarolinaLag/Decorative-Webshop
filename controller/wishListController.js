let User = require('../model/user');

exports.wishListShow = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id }).populate(
      'wishList'
    );
    res.render('wishlist.ejs', {
      products: user.wishList,
      user: req.user.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.wishListAdd = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = await User.findOne({ _id: req.user.user._id });

    user.addWish(productId, user);

    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

exports.deleteWish = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id });

    const wishId = req.params.id;

    user.wishList.pull({ _id: wishId });

    user.save();
    res.redirect('/wishlist');
  } catch (err) {
    console.log(err);
  }
};
