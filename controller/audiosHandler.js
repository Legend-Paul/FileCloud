const { addNewFile, getFiles } = require("../utils/files");
const prisma = require("../utils/prisma");
const { createNewFolder, getFolders } = require("../utils/folders");
const TYPE = "AUDIO";

const audiosGet = async (req, res) => {
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

const audiosNewFile = async (req, res) => {
    try {
        await addNewFile(req, res, TYPE);
    } catch (err) {
        throw err;
    }
};

const audiosNewFolder = async (req, res) => {
    try {
        await createNewFolder(req, res, TYPE);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    audiosGet,
    audiosNewFile,
    audiosNewFolder,
};
