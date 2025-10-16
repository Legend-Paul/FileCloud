const addNewFile = require("../utils/addNewFile");
const prisma = require("../utils/prisma");

const documentsGet = async (req, res) => {
    const path = req.originalUrl;
    const name = path.split("/").at(-1);
    const parentName = path.split("/").at(-2) || null;
    const files = await getFolderFiles(req, name, parentName);

    res.render("home", { path, fileType: name, files });
};

const getFolderFiles = async (req, name, parentName) => {
    let files = null;
    if (!parentName)
        files = await prisma.file.findMany({
            where: {
                folder: {
                    name,
                    type: "DOCUMENT",
                },
                owner: req.user,
            },
        });
    else
        files = await prisma.file.findMany({
            where: {
                folder: {
                    name,
                    type: "DOCUMENT",
                    parent: {
                        name: parentName,
                        type: "DOCUMENT",
                    },
                },
                owner: req.user,
            },
        });
    return files;
};

const documentsNewFile = async (req, res) => {
    try {
        const { fileType } = req.body;
        const { id } = req.user;
        const uploadedFiles = req.files;

        await addNewFile(fileType, uploadedFiles, id);

        res.redirect(req.originalUrl);
    } catch (err) {
        throw err;
    }
};

const documentsNewFolder = async (req, res) => {
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
            type: "DOCUMENT",
            parent: !parentName
                ? null
                : {
                      is: {
                          name: parentName,
                          type: "DOCUMENT",
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
            type: "DOCUMENT",
            parent: {
                name,
                type: "DOCUMENT",
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
    const folder = await prisma.folder.create({
        data: {
            name: folderName,
            type: "DOCUMENT",
            parent: {
                connect: { id: parentFolder.id },
            },
            owner: {
                connect: { id: req.user.id },
            },
        },
    });

    console.log("Folder created:", folder);

    res.send("Folder created");
};

module.exports = { documentsGet, documentsNewFile, documentsNewFolder };
