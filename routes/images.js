const express = require("express");
const imagesHandler = require("../controller/imagesHandler");
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

const imagesRouter = express.Router();
imagesRouter.get("/*view/:id", viewFileHandler);
imagesRouter.get("/", imagesHandler.imagesGet);
imagesRouter.post(
    "/*new/file",
    upload.array("file", 12),
    imagesHandler.imagesNewFile
);
imagesRouter.post("/*new/folder", imagesHandler.imagesNewFolder);
imagesRouter.post("/*share/:id", shareHandler);
imagesRouter.post("/*item/delete", deleteHandler);
imagesRouter.post("/*item/rename", renameHandler);
imagesRouter.get("/{*splat}", imagesHandler.imagesGet);

module.exports = imagesRouter;
