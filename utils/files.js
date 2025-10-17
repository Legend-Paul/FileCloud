const prisma = require("../utils/prisma");

async function addNewFile(req, res, type) {
    const { fileType } = req.body;
    const { id } = req.user;
    const uploadedFiles = req.files;
    const folderPath = req.originalUrl.split("/").slice(0, -2).join("/");

    const folder = await prisma.folder.findFirst({
        where: {
            name: fileType,
            type,
            owner: req.user,
        },
        include: {
            files: true,
        },
    });

    const files = uploadedFiles.map((file) => {
        const mimeType = file.mimetype.split("/").at(-1);
        const nameExist = folder.files.find(
            (f) => f.name === file.originalname
        );

        return {
            name: nameExist
                ? file.originalname + "-" + Date.now()
                : file.originalname,
            mimeType,
            url: file.path,
            size: file.size,
            ownerId: id,
            folderId: folder.id,
        };
    });
    await prisma.file.createMany({
        data: files,
    });
    res.redirect(folderPath);
}

const getFiles = async (req, res, type) => {
    const path = req.originalUrl;
    const name = path.split("/").at(-1);
    const parentName = path.split("/").at(-2) || null;
    let files = null;
    if (!parentName)
        files = await prisma.file.findMany({
            where: {
                folder: {
                    name,
                    type,
                    owner: req.user,
                },
            },
        });
    else
        files = await prisma.file.findMany({
            where: {
                folder: {
                    name,
                    type,
                    parent: {
                        name: parentName,
                        type,
                    },
                },
                owner: req.user,
            },
        });
    return res.render("home", { path, fileType: name, files });
};

module.exports = { addNewFile, getFiles };
