const { addNewFile, getFiles } = require("../utils/files");
const prisma = require("../utils/prisma");
const { createNewFolder, getFolders } = require("../utils/folders");

const documentsGet = async (req, res) => {
    try {
        const path = req.originalUrl;
        const name = path.split("/").at(-1);
        const pathArray = path.split("/");
        console.log(pathArray);
        console.log(pathArray.slice(2).join("/"));

        const [folders, files] = await Promise.all([
            getFolders(req, res, "DOCUMENT"),
            getFiles(req, res, "DOCUMENT"),
        ]);

        res.render("home", { path, fileType: name, folders, files, pathArray });
    } catch (err) {
        throw err;
    }
};

const documentsNewFile = async (req, res) => {
    try {
        await addNewFile(req, res, "DOCUMENT");
    } catch (err) {
        throw err;
    }
};

const documentsNewFolder = async (req, res) => {
    try {
        await createNewFolder(req, res, "DOCUMENT");
    } catch (err) {
        throw err;
    }
};

module.exports = { documentsGet, documentsNewFile, documentsNewFolder };
