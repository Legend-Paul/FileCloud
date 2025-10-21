const prisma = require("../utils/prisma");

const renameHandler = async (req, res) => {
    const path = req.originalUrl;
    const back = path.split("/").slice(0, -2).join("/");

    const { renameItem, newFileName } = req.body;
    const { itemToRename, type } = JSON.parse(renameItem);
    const fileHasExtension = newFileName.includes(".");
    let finalNewFileName = newFileName;
    if (type === "files" && !fileHasExtension && itemToRename.mimeType) {
        finalNewFileName = newFileName + "." + itemToRename.mimeType;
    }

    type === "folders"
        ? await prisma.folder.update({
              where: {
                  id: itemToRename.id,
                  owner: req.user,
              },
              data: {
                  name: finalNewFileName,
              },
          })
        : await prisma.file.update({
              where: {
                  id: itemToRename.id,
                  owner: req.user,
              },
              data: {
                  name: finalNewFileName,
              },
          });
    res.redirect(back);
};

module.exports = renameHandler;
