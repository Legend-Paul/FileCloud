const prisma = require("../utils/prisma");

async function createNewFolder(req, res, type) {
    let { folderName } = req.body;
    const path = req.originalUrl;
    const name = path.split("/").at(-3);
    const parentName = path.split("/").at(-4) || null;
    const folderPath = path.split("/").slice(0, -2).join("/");

    // Find the parent folder
    const parentFolder = await prisma.folder.findFirst({
        where: {
            name,
            type,
            parent: !parentName
                ? null
                : {
                      is: {
                          name: parentName,
                          type,
                      },
                  },
        },
    });

    if (!parentFolder) {
        throw new Error("Parent folder not found");
    }

    // check i folder exist
    const folderExist = await prisma.folder.findFirst({
        where: {
            name: folderName,
            type,
            parent: {
                name,
                type,
            },
            owner: req.user,
        },
    });

    if (folderExist) {
        folderName = folderName + "-" + Date.now();
    }

    // Create the new folder and connect it to the parent
    await prisma.folder.create({
        data: {
            name: folderName,
            type,
            parent: {
                connect: { id: parentFolder.id },
            },
            owner: {
                connect: { id: req.user.id },
            },
        },
    });
    return res.redirect(folderPath);
}

async function getFolders(req, res, type) {
    const path = req.originalUrl;
    const name = path.split("/").at(-1);
    const parentName = path.split("/").at(-2) || null;

    const folders = await prisma.folder.findMany({
        where: {
            name,
            type,
            parent: !parentName
                ? null
                : {
                      name: parentName,
                      type,
                  },
            owner: req.user,
        },
    });
    return folders;
}

module.exports = { createNewFolder, getFolders };
