
exports.logout = (req, res) => {
  res.clearCookie('jwtToken');
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/');
};
