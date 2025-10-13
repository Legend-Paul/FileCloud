const express = require("express");
const signupHandler = require("../controller/signupHandler");

const signupRouter = express.Router();
signupRouter.get("/", signupHandler.signupGet);
signupRouter.post("/", signupHandler.signupPost);

module.exports = signupRouter;
