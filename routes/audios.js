const express = require("express");
const audiosHandler = require("../controller/audiosHandler");
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

const audiosRouter = express.Router();
audiosRouter.get("/*view/:id", viewFileHandler);
audiosRouter.get("/", audiosHandler.audiosGet);
audiosRouter.post(
    "/*new/file",
    upload.array("file", 12),
    audiosHandler.audiosNewFile
);
audiosRouter.post("/*new/folder", audiosHandler.audiosNewFolder);
audiosRouter.post("/*share/:id", shareHandler);
audiosRouter.post("/*item/delete", deleteHandler);
audiosRouter.post("/*item/rename", renameHandler);
audiosRouter.get("/{*splat}", audiosHandler.audiosGet);

module.exports = audiosRouter;
