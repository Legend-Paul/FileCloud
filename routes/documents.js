const express = require("express");
const documentsHandler = require("../controller/documentsHandler");
const renameHandler = require("../controller/rename");
const deleteHandler = require("../controller/delete");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.fieldname + "-" + Date.now();
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const documentsRouter = express.Router();
documentsRouter.get("/", documentsHandler.documentsGet);
documentsRouter.post(
    "/*new/file",
    upload.array("file", 12),
    documentsHandler.documentsNewFile
);
documentsRouter.post("/*new/folder", documentsHandler.documentsNewFolder);
documentsRouter.post("/*item/delete", deleteHandler);
documentsRouter.post("/*item/rename", renameHandler);
documentsRouter.get("/{*splat}", documentsHandler.documentsGet);
module.exports = documentsRouter;
