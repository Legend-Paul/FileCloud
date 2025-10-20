const express = require("express");
const homepageHandler = require("../controller/homepageHandler");

const homeRouter = express.Router();
homeRouter.get("/", homepageHandler);

module.exports = homeRouter;
