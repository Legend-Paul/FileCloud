const express = require("express");

const logoutRouter = express.Router();
logoutRouter.get("/", (req, res) => {
    req.logout((err) => {
        if (err) throw err;
        res.redirect("/login");
    });
});

module.exports = logoutRouter;
