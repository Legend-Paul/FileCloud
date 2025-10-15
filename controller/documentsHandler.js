const documentsGet = (req, res) => {
    res.render("home", { notHome: true });
};

module.exports = { documentsGet };
