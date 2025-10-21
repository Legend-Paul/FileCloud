const express = require("express");
const homepageHandler = require("../controller/homepageHandler");
const renameHandler = require("../controller/rename");
const deleteHandler = require("../controller/delete");
const viewFileHandler = require("../controller/viewFileHandler");
const shareHandler = require("../controller/shareHandler");

const homeRouter = express.Router();
homeRouter.get("/", homepageHandler);
homeRouter.post("/item/delete", deleteHandler);
homeRouter.post("/item/rename", renameHandler);
homeRouter.post("/share/:id", shareHandler);
homeRouter.get("/view/:id", viewFileHandler);

module.exports = homeRouter;
