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

const documentRename = async (req, res) => {
    const path = req.originalUrl;
    const back = path.split("/").slice(0, -1).join("/");
    const itemType = path.split("/").at(1).toUpperCase().slice(0, -1); // file or folder
    const { renameItem, newFileName } = req.body;
    const { id, type, fileType } = JSON.parse(renameItem);
    const fileHasExtension = newFileName.includes(".");
    let finalNewFileName = newFileName;
    if (type === "files" && !fileHasExtension && fileType) {
        finalNewFileName = newFileName + "." + fileType;
    }
    const item =
        type === "files"
            ? await prisma.file.findFirst({
                  where: {
                      name: finalNewFileName,
                      mimeType: fileType,
                      owner: req.user,
                  },
              })
            : await prisma.folder.findFirst({
                  where: {
                      name: newFileName,
                      owner: req.user,
                      type: itemType,
                  },
              });
    type === "files"
        ? await prisma.file.update({
              where: {
                  id,
                  mimeType: fileType,
                  owner: req.user,
              },
              data: {
                  name: item
                      ? finalNewFileName + "-" + Date.now()
                      : finalNewFileName,
              },
          })
        : await prisma.folder.update({
              where: {
                  id,
                  type: itemType,
                  owner: req.user,
              },
              data: {
                  name: item ? newFileName + "-" + Date.now() : newFileName,
              },
          });
    res.redirect(back);
};

module.exports = {
    documentsGet,
    documentsNewFile,
    documentsNewFolder,
    documentsDelete,
    documentRename,
};
