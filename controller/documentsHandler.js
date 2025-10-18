const { addNewFile, getFiles } = require("../utils/files");
const prisma = require("../utils/prisma");
const { createNewFolder, getFolders } = require("../utils/folders");

const documentsGet = async (req, res) => {
    try {
        const path = req.originalUrl;
        const name = path.split("/").at(-1);
        const pathArray = path.split("/");

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

const documentsDelete = async (req, res) => {
    const { deleteItems } = req.body;

    try {
        const path = req.originalUrl;
        const back = path.split("/").slice(0, -1).join("/");
        console.log(back);

        const items = JSON.parse(deleteItems);
        const { folders, files } = items;

        await Promise.all([
            prisma.folder.deleteMany({
                where: {
                    id: { in: folders },
                    owner: req.user,
                },
            }),
            prisma.file.deleteMany({
                where: {
                    id: { in: files },
                    owner: req.user,
                },
            }),
        ]);
        res.redirect(back);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    documentsGet,
    documentsNewFile,
    documentsNewFolder,
    documentsDelete,
};
