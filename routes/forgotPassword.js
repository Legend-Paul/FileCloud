const express = require("express");
const forgotPasswordHandler = require("../controller/forgotPasswordHandler");

const forgotPasswordRouter = express.Router();
forgotPasswordRouter.get("/", forgotPasswordHandler.forgotPasswordGet);
forgotPasswordRouter.post("/", forgotPasswordHandler.forgotPasswordPost);

module.exports = forgotPasswordRouter;
