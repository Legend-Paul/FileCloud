const express = require("express");
const loginHandler = require("../controller/loginHandler");

const loginRouter = express.Router();
loginRouter.get("/", loginHandler.loginGet);

module.exports = loginRouter;
