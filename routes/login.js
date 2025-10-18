const express = require("express");
const loginHandler = require("../controller/loginHandler");
const passport = require("passport");

const loginRouter = express.Router();
loginRouter.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);
loginRouter.get("/", loginHandler.loginGet);

module.exports = loginRouter;
