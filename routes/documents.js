const express = require("express");
const documentsHandler = require("../controller/documentsHandler");

const documentsRouter = express.Router();
documentsRouter.get("/", documentsHandler.documentsGet);
// documentsRouter.post("/", documentsHandler.documentsPost);

module.exports = documentsRouter;
