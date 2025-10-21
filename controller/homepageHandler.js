const prisma = require("../utils/prisma");

const homepageHandler = async (req, res) => {
    try {
        const [files, totlalFiles, totalFolders, totalSizeResult] =
            await Promise.all([
                prisma.file.findMany({
                    where: {
                        owner: req.user,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 10,
                }),
                prisma.file.count({
                    where: {
                        owner: req.user,
                    },
                }),
                prisma.folder.count({
                    where: {
                        owner: req.user,
                    },
                }),
                prisma.file.aggregate({
                    where: {
                        owner: req.user,
                    },
                    _sum: {
                        size: true,
                    },
                }),
            ]);
        const totalSize = totalSizeResult._sum.size || 0;

        res.render("home", { files, totlalFiles, totalFolders, totalSize });
    } catch (err) {
        throw err;
    }
};

module.exports = homepageHandler;
