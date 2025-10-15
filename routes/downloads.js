const express = require("express");
const downloadsHandler = require("../controller/downloadsHandler");

const downloadsRouter = express.Router();
downloadsRouter.get("/", downloadsHandler.downloadsGet);
// downloadsRouter.post("/", downloadsHandler.downloadsPost);

module.exports = downloadsRouter;
