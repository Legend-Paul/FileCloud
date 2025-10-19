const prisma = require("../utils/prisma");

const deleteHandler = async (req, res) => {
    const { deleteItems } = req.body;

    try {
        const path = req.originalUrl;
        const back = path.split("/").slice(0, -2).join("/");

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

module.exports = deleteHandler;
