const { addNewFile, getFiles } = require("../utils/files");
const prisma = require("../utils/prisma");
const { createNewFolder, getFolders } = require("../utils/folders");
const TYPE = "IMAGE";

const imagesGet = async (req, res) => {
    try {
        const path = req.originalUrl;
        const name = path.split("/").at(-1);
        const pathArray = path.split("/");

        const [folders, files] = await Promise.all([
            getFolders(req, res, TYPE),
            getFiles(req, res, TYPE),
        ]);

        res.render("home", { path, fileType: name, folders, files, pathArray });
    } catch (err) {
        throw err;
    }
};

const imagesNewFile = async (req, res) => {
    try {
        await addNewFile(req, res, TYPE);
    } catch (err) {
        throw err;
    }
};

const imagesNewFolder = async (req, res) => {
    try {
        await createNewFolder(req, res, TYPE);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    imagesGet,
    imagesNewFile,
    imagesNewFolder,
};
