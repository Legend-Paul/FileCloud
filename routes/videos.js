const express = require("express");
const videosHandler = require("../controller/videosHandler");
const renameHandler = require("../controller/rename");
const deleteHandler = require("../controller/delete");
const viewFileHandler = require("../controller/viewFileHandler");
const shareHandler = require("../controller/shareHandler");
const path = require("node:path");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

const videosRouter = express.Router();
videosRouter.get("/*view/:id", viewFileHandler);
videosRouter.get("/", videosHandler.videosGet);
videosRouter.post(
    "/*new/file",
    upload.array("file", 12),
    videosHandler.videosNewFile
);
videosRouter.post("/*new/folder", videosHandler.videosNewFolder);
videosRouter.post("/*share/:id", shareHandler);
videosRouter.post("/*item/delete", deleteHandler);
videosRouter.post("/*item/rename", renameHandler);
videosRouter.get("/{*splat}", videosHandler.videosGet);

module.exports = videosRouter;
