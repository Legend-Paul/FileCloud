const downloadsGet = (req, res) => {
    res.render("home", { notHome: true });
};

module.exports = { downloadsGet };
