const prisma = require("../utils/prisma");

const deleteHandler = async (req, res) => {
    const { deleteItems } = req.body;
    console.log(deleteItems);

    try {
        const path = req.originalUrl;
        const back = path.split("/").slice(0, -2).join("/");

        const items = JSON.parse(deleteItems);
        const { folders, files } = items;
        const folderIds = folders.map((folder) => folder.id);
        const fileIds = files.map((file) => file.id);

        await Promise.all([
            prisma.folder.deleteMany({
                where: {
                    id: { in: folderIds },
                    owner: req.user,
                },
            }),
            prisma.file.deleteMany({
                where: {
                    id: { in: fileIds },
                    owner: req.user,
                },
            }),
        ]);
        res.redirect(back);
    } catch (err) {
        throw err;
    }
};

module.exports = deleteHandler;
