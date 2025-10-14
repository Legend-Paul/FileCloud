const loginGet = (req, res) => {
    res.render("login", { error: req.flash("error")[0] });
};

module.exports = { loginGet };
