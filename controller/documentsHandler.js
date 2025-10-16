const addNewFile = require("../utils/addNewFile");
const prisma = require("../utils/prisma");

const documentsGet = async (req, res) => {
    const path = req.originalUrl;
    const name = path.split("/").at(-1);
    const parentName = path.split("/").at(-2) || null;

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

    res.render("home", { path, fileType: name, files });
};
const documentsNewFile = async (req, res) => {
    try {
        const { fileType } = req.body;
        const { id } = req.user;
        const uploadedFiles = req.files;

        await addNewFile(fileType, uploadedFiles, id);

        res.redirect("/");
    } catch (err) {
        throw err;
    }
};

module.exports = { documentsGet, documentsNewFile };
