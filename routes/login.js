const express = require("express");
const loginHandler = require("../controller/loginHandler");
const passport = require("passport");

const loginRouter = express.Router();
loginRouter.get("/", loginHandler.loginGet);
loginRouter.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

module.exports = loginRouter;
