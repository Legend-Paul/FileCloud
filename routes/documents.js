const express = require("express");
const documentsHandler = require("../controller/documentsHandler");
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

const documentsRouter = express.Router();
documentsRouter.get("/*view/:id", viewFileHandler);
documentsRouter.get("/", documentsHandler.documentsGet);
documentsRouter.post(
    "/*new/file",
    upload.array("file", 12),
    documentsHandler.documentsNewFile
);
documentsRouter.post("/*new/folder", documentsHandler.documentsNewFolder);
documentsRouter.post("/*share/:id", shareHandler);
documentsRouter.post("/*item/delete", deleteHandler);
documentsRouter.post("/*item/rename", renameHandler);
documentsRouter.get("/{*splat}", documentsHandler.documentsGet);

module.exports = documentsRouter;
