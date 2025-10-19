const prisma = require("../utils/prisma");

const renameHandler = async (req, res) => {
    const path = req.originalUrl;
    const back = path.split("/").slice(0, -2).join("/");
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

module.exports = renameHandler;
