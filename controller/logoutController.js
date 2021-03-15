exports.logout = (req, res) => {
    res.clearCookie("jwtToken").redirect("/login");
};
