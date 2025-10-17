const prisma = require("../utils/prisma");

async function createNewFolder(req, res, type) {
    const { folderName } = req.body;

    const path = req.originalUrl;
    const originalPath = path.split("/");
    const name = path.split("/").at(-3);
    const parentName = path.split("/").at(-4) || null;

    console.log(folderName, name, parentName);

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
    let folderPath = path.split("/").slice(0, -2).join("/");
    if (folderExist) {
        // const files = await getFolderFiles(req, name, parentName);
        // return res.status(200).redirect(path, {
        //     path: folderPath,
        //     fileType: name,
        //     files,
        //     error: "Folder exists",
        // });
        return res.redirect(folderPath);
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

module.exports = createNewFolder;
